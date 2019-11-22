import React from 'react';

const DrawBoard = () => {

    let drawSpace = [];
    let startingX = 65;
    let startingY = 50;

    for (let row = 0; row <= 5; row++) {
        for (let col = 0; col <= 6; col++) {
            drawSpace.push(<circle key={`${row}${col}`} cx={`${startingX}`} cy={`${startingY}`} r="48" fill="black" stroke="none" />)
            startingX += 105;
        }
        startingX = 65;
        startingY += 105;
    }

    return (
        <>
            <svg className="game-board">
                <defs>
                    <mask id="mask" x="0" y="0" width="775px" height="660px">
                        <rect x="0" y="0" height="660px" width="775px" fill="white"></rect>
                        {drawSpace}
                    </mask>
                </defs>
                <rect id="board-back" x="0" y="0" width="775px" height="660px" mask="url(#mask)" fillOpacity="1" fill="#5FCF80" />
            </svg>
        </>
    );
}

export default DrawBoard;