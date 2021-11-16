import React from 'react'

/** Services */
import { calculateBackgroundHeight, calculateBackgroundWidth } from '../../service/puzzleDataHandler';

/** Assets */
import image from '../../assets/house.png'

const PuzzleImage = ({ part, updateBoxesOrder, pieceToShuffle, setPieceToShuffle, width, height, index, level }) => {

    const pieceStyle = {
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover", 
        backgroundImage: localStorage.getItem('puzzleImage') ? 
             `url(${localStorage.getItem('puzzleImage')})` : `url(${image})`, 
        backgroundSize: "700px 600px",
        backgroundPosition: `-${calculateBackgroundWidth(width, level, index)}px -${calculateBackgroundHeight(height, level, index)}px`,
        float: "left",
        // border: "1px solid transparent",
        borderRadius: "4px"
    };

    
    /** Add focuse style to selected piece */
    const handlePieceFocus = (e) => {
        e.target.classList.toggle('focused')
        if(!pieceToShuffle) {
            setPieceToShuffle(part)
        } else {
            updateBoxesOrder(part);
            setPieceToShuffle(null);
        }

    }
    
    
    return (
            <div 
                className={`puzzle-piece piece-${index}`}
                style={pieceStyle}
                onClick={handlePieceFocus} 
            ></div>
    )
}

export default PuzzleImage;
