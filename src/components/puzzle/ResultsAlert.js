import React from 'react'

/** UI components */
import Button from '../UI-components/Button'

/** Components */
import Results from './Results'

const ResultsAlert = ({ time, results, finishGame, restartGame }) => {
    return (
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
      )
}

export default ResultsAlert
