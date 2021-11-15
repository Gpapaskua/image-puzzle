import React from 'react'

const Results = ({ result }) => {



    return (
        <div className="row justify-content-center pt-3">
                      <div className="col-lg-3 d-flex justify-content-center align-items-center">
                        <span>{result.level}</span>
                      </div>
                      <div className="col-lg-3 d-flex justify-content-center align-items-center">
                      <span>{result.time}</span>
                      </div>
                      <div className="col-lg-3">
                      <img src={result.image} className="result-image" alt="puzzle" />
                      </div>
        </div>
    )
}

export default Results
