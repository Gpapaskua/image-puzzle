import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

/** Components */
import PuzzleImage from "./PuzzleImage";
import Timer from "./Timer";

/** UI Components */
import Button from "./UI-components/Button";

/** Packages */
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/** Services */
import {
  checkCompleted,
  cleanPuzzleData,
  createPuzzlePieces,
  shuffleArray,
} from "../service/puzzleDataHandler";

/** Assets */
import image from "../assets/house.png";
import user from "../assets/user.jpg"
import { addNewGameResult, getAllResults } from "../service/FbServices";
import Results from "./Results";

const MySwal = withReactContent(Swal); // Initialize Sweet Alert

const Puzzle = () => {

  const navigate = useNavigate();
  const { lvl } = useParams();
  const level = lvl.split("x")[0];

  const [pieceToShuffle, setPieceToShuffle] = useState(null);
  const [showOriginalImage, setShowOriginalImage] = useState(false);
  const [playTime, setPlayTime] = useState(parseInt(localStorage.getItem("puzzlePlayTime")) || 1);
  const [boxes, setBoxes] = useState(JSON.parse(localStorage.getItem("puzzle")) || createPuzzlePieces(level));


  const blockWidth = 700 / parseInt(level);
  const blockHeight = 600 / parseInt(level);
  const order = boxes.map((box) => box.correctPosition);

  const isCompleted = checkCompleted(order); // Check if game is finished
  const username = localStorage.getItem("nickname") || null; // Get use nickname from localstorage
  const userId = localStorage.getItem("userId");
  const time = localStorage.getItem("puzzlePlayTime") || 1;


  /** Handle puzzle pieces swap */
  const updateBoxesOrder = (piece) => {
    const newOrder = [];
    boxes.map((box) => {
      if (box.correctPosition === piece.correctPosition) {
        return newOrder.push(pieceToShuffle);
      } else if (box.correctPosition === pieceToShuffle.correctPosition) {
        return newOrder.push(piece);
      } else {
        return newOrder.push(box);
      }
    });
    localStorage.setItem("puzzle", JSON.stringify(newOrder));
    setBoxes(newOrder);
    
  };

  /** Finish game handler */
  const finishGame = useCallback(
      () => {
        cleanPuzzleData();
        navigate("/");
        MySwal.close();
      },
      [navigate],
  );

  /** Restart Game handler */
  const restartGame = useCallback(() => {
    const newBoxes = createPuzzlePieces(parseInt(level));
    localStorage.removeItem("puzzle");
    setBoxes(shuffleArray(newBoxes));
    setPlayTime(1);
    MySwal.close();
  }, [level]);

  /** Show original image */
  const toggleOriginalImage = () => {
    setShowOriginalImage(true);
    setPlayTime((prevPlayTime) => prevPlayTime + 10);
  };

  useEffect(() => {
    if (showOriginalImage) {
      MySwal.fire({
        title: "<strong>This will cost you extra 10 seconds.</strong>",
        icon: false,
        html: (
          <div className="original-image-container">
            <img
              src={localStorage.getItem("puzzleImage") || image}
              alt="original"
            />
          </div>
        ),
        showCloseButton: true,
        showCancelButton: false,
        customClass: "original-image",
        focusConfirm: false,
        showConfirmButton: false,
      }).then(() => {
        setShowOriginalImage(false);
      });
    }
  }, [showOriginalImage]);


  /** Save game level */
  useEffect(() => {
    localStorage.setItem("puzzleLevel", level);

    return  () => {
        cleanPuzzleData();
    }
  }, [level]);

  /** Get and previous game results from firestore */
  const getResults = useCallback(
    async () => {
      
      const imageUrl = localStorage.getItem("puzzleImage") || image;
      await addNewGameResult(userId, level, time, imageUrl);
      const results = await getAllResults(userId);
      
        setTimeout(
            () =>
              MySwal.fire({
                title: "<strong>Game Finished!</strong>",
                icon: "success",
                html: (
                  <div className="overflow-hidden">
                    <p>Total Time {time} seconds.</p>
                    <p className="text-info">Your Results</p>
                    <div className="row justify-content-center pb-2">
                      <div className="col-lg-3">
                        Level
                      </div>
                      <div className="col-lg-3">
                        Time
                      </div>
                      <div className="col-lg-3">
                        Image
                      </div>
                    {
                      results && results.map((res, index) => {
                        return <Results result={res} key={index} />
                      })
                    }
                    </div>
                    <Button text="Home" className="start-button" onClickHandler={finishGame} />
                    <Button text="Try again" className="start-button mx-3" onClickHandler={restartGame} />
                   
                  </div>
                ),
    
                showCloseButton: false,
                showCancelButton: false,
                focusConfirm: false,
                showConfirmButton: false,
                allowOutsideClick: false,
              }),
            1000
          );
    },
    [userId, finishGame, level, restartGame, time],
  )

  /** Show results when game is finished */
  useEffect(() => {
    if(isCompleted){
      getResults();
    }
  }, [isCompleted, restartGame, finishGame, playTime, getResults]);

  

  

  return (
    <div className="container-fluid d-flex flex-column align-items-center pb-5">
      <div className="d-flex w-100 justify-content-between py-2">
        {
          username ? 
            <div className="align-self-end">
            <img src={user} alt="user" id="user-logo" className="rounded" />
            <span className="mx-3 lead text-white">{username}</span>
            </div>
            :
            null
        }
        

       { 
       !isCompleted ?  
        <div className="d-flex align-self-end">
          <Timer 
          playTime={playTime} 
          setPlayTime={setPlayTime}
          order={order}
            />
            <Button text="Original Picture" className="start-button" onClickHandler={toggleOriginalImage} />
        </div>
          :
          null
       } 
        
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${level}, ${blockWidth}px)`,
          gap: "10px",
          placeItems: "center",
        }}
      >
        {
        boxes.map((part, index) => {
          return (
            <PuzzleImage
              index={part.correctPosition}
              updateBoxesOrder={updateBoxesOrder}
              part={part}
              level={level}
              width={blockWidth}
              height={blockHeight}
              key={index}
              pieceToShuffle={pieceToShuffle}
              setPieceToShuffle={setPieceToShuffle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Puzzle;
