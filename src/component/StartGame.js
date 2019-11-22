import React from 'react';

const StartGame = (props) => {
    return (
        <button className="begin-game" onClick={props.gameStart}>Start Game!</button>
    );
}

export default StartGame;