import React, { memo, useEffect, useCallback } from 'react'

const Timer = ({ playTime, setPlayTime }) => {

    const updatePlayTime = useCallback(
        () => {
                setPlayTime((prevPlayTime) => prevPlayTime + 1);
                    localStorage.setItem("puzzlePlayTime", playTime);
               
                 
        },
        [playTime, setPlayTime],
    )
    useEffect(() => {
        const timeout = setTimeout(() => {
            updatePlayTime();
        }, 1000);

        

        return () => clearTimeout(timeout);
        
    }, [updatePlayTime])
    
    return (
        <span className="d-flex align-items-center bg-secondary px-3 text-white rounded">
          {playTime}
        </span>
    )
}

export default memo(Timer)
