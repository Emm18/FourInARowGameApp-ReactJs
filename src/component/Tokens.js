import React from 'react';

const Tokens = (props) => {
    return (
        <div>
            {!props.isDone && props.tokensLeft !== 0 ? <div className={`token${props.currentTurn}`} style={{ top: props.top, left: props.left }}></div> : null}
            {props.tokens.map((player, index) => (
                    <div key={index} className={`token${player.player}`} style={{ top: player.top, left: player.left }}></div>
                ))}
        </div>

    );

}

export default Tokens;