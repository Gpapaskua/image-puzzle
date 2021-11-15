import React from 'react'

const Button = ({ onClickHandler, text, ...rest }) => {
    return <button onClick={onClickHandler} {...rest}>{text}</button>
}

export default Button
