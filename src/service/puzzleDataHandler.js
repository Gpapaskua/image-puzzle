/** Change order of puzzle pieces */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/** Get correct width for puzzle piece */
export const calculateBackgroundWidth = (width, level, index) => {
    
    return index !== 0 && index % parseInt(level) !== 0 ? width * (index % parseInt(level)) : 0; 
}

export const calculateBackgroundHeight = (height, level, index) => {
    
    return index < 3 ? 0 : Math.floor(index / parseInt(level)) * height  
}

/** Get correct height for puzzle piece */
export const checkCompleted = (array) => {
    for(let i=0; i<array.length; i++){
        if(i !== parseInt(array[i])){
            return false;
        }
    }
    return true;
}

/** Create array for puzzle pieces with correct positions  */
export const createPuzzlePieces = (level) => {
    const test = [];
        for(let i=0; i < Math.pow(parseInt(level), 2); i++){
            test.push({
                correctPosition: i
            });
        }
        return shuffleArray(test);
}

/** Check if image url is valid */
export function checkImage(imageSrc, good, bad) {
    let img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img.src = imageSrc;
}

/** Initialize puzzle levels */
export const puzzleLevels = [
    { value: "3x3", text: "3X3" },
    { value: "4x4", text: "4X4" },
    { value: "6x6", text: "6X6" },
    { value: "8x8", text: "8X8" },
    { value: "12x12", text: "12X12" },
    { value: "16x16", text: "16X16" },
    { value: "20x20", text: "20X20" }
];

/** Reset puzzle data */
export const cleanPuzzleData = () => {
    localStorage.removeItem("puzzleLevel");
    localStorage.removeItem("puzzlePlayTime");
    localStorage.removeItem("puzzle");
    localStorage.removeItem("puzzleImage");
}
