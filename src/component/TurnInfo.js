import React from 'react';

const TurnInfo = (props) => {
    return (
        <div>
            <h1>Player {props.currentTurn} 's turn</h1>
            <h2>Token Left : {props.tokensLeft}</h2>
        </div>
    );
}

export default TurnInfo;