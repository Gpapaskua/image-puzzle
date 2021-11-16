import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

/** Packages */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { addNewPlayer } from '../service/FbServices';

/** Services */
import { checkImage, cleanPuzzleData, puzzleLevels } from '../service/puzzleDataHandler';

/** UI Components */
import Button from '../components/UI-components/Button';

const MySwal = withReactContent(Swal); // Initialize Sweet Alert

const Home = () => {

    const [level, setLevel] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [isValidImage, setIsValidImage] = useState(null);
    const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
    const [puzzleImageURL, setPuzzleImageURL] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if(nickname !== ""){
            setDisabled(true);
            if(!localStorage.getItem("userId") || nickname !== localStorage.getItem("nickname")){
                const id = await addNewPlayer(nickname);
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("userId", id);
            }
            setDisabled(false);
        }
        if(puzzleImageURL !== ""){
            checkImage(puzzleImageURL, () => { 
                localStorage.setItem("puzzleImage", puzzleImageURL);  
                navigate(`/${level}`); 
            },
         () => setIsValidImage("Oops Image isn't valid!") );
        }
        
        if(!localStorage.getItem("puzzleImage") &&  puzzleImageURL === ""){
            navigate(`/${level}`);
        }
        // 
    };

    /** Restore previous game */
    const continuePreviousGame = useCallback(
        () => {
            navigate(`/${localStorage.getItem("puzzleLevel")}x${localStorage.getItem("puzzleLevel")}`);
            MySwal.close();
        },
        [navigate],
    );

    /** Clear previous game */
    const clearPreviousGame = () => {

        cleanPuzzleData();
        MySwal.close();
    };

    useEffect(() => {
        if(localStorage.getItem("puzzleLevel")){
            setTimeout(() => MySwal.fire(
                {
                    title: '<strong>Welcome Back!</strong>',
                    icon: 'question',
                    html: <> 
                             <p>Do you wish to continue to your previous game?</p>
                             <Button text="Continue" className="start-button mx-2" onClickHandler={continuePreviousGame} />
                             <Button text="Start New" className="start-button mx-2" onClickHandler={clearPreviousGame} />
                          </>,
                    
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false,
                    showConfirmButton: false
                }), 800)
        }

        return () => {
            setIsValidImage(null);
        }
    
    }, [continuePreviousGame])
    

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center home">
            <div className="w-50 mx-auto">
             <div className="d-flex flex-column align-items-center text-white puzzle-intro py-5">
                <p className="display-5 text-light text-center pb-3 puzzle-title">Image Puzzle</p>
                <form onSubmit={handleSubmit} className="w-50">
                <div className="d-flex flex-column align-items-center">
                    <div className="w-100">
                        <label htmlFor="nickname">Pick nickname</label>
                        <input 
                            type="text" 
                            className="form-control mb-3"
                            value={nickname} 
                            id="nickname" 
                            placeholder="Very creative nickname"
                            onChange={(e) =>setNickname(e.target.value)} />

                        <label htmlFor="customImage">Insert image URL</label>
                        <input 
                            type="search" 
                            className="form-control mb-3"
                            value={puzzleImageURL} 
                            id="customImage" 
                            placeholder="example.com/image.png"
                            onChange={(e) =>setPuzzleImageURL(e.target.value)} />
                        {
                            isValidImage && <p className="text-dark fw-bold">{isValidImage}</p>
                        }

                        <label htmlFor="level">Choose Level</label>
                        <select 
                            className="form-control mb-3" 
                            value={level}
                            id="level" 
                            required 
                            onChange={(e) => setLevel(e.target.value)}>
                            <option value=""></option>
                            {
                                puzzleLevels.map(level => <option value={level.value} key={level.value}>{level.text}</option>)
                            }
                        </select>

                    </div>
                        <Button 
                            text={"Start Game"} 
                            className={`start-button mt-5 ${disabled ? "disabled" : ""}`} 
                            disabled={disabled}></Button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Home
