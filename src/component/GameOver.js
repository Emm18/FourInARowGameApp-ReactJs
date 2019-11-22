import React from 'react';

const GameOver = (props) => {
    return (
        <div>
            <h1> Game over! </h1>
            <button className="restart-game" onClick={props.resetGame}>Restart</button>
        </div>
    );
}

export default GameOver;