import React, { Component } from 'react';

// Components
import DrawBoard from './DrawBoard';
import StartGame from './StartGame';
import GameOver from './GameOver';
import TurnInfo from './TurnInfo';
import Tokens from './Tokens';




class App extends Component {

  state = {
    tokens: [], //dropped token
    slots: [], //slot guide
    position: [-50, 25],//starting position is -52,25
    tokensLeft: 42, //token counter
    currentTurn: 1, //whos turn it is 1 or 2
    isDone: false, //is finish, already have a winner
    ready: false, // ready, for starting the game
  }


  //info
  //animation

  gameReady = () => {
    this.setState(() => {
      return {
        ready: true
      }
    })
  }

  resetGame = () => {
    window.location.reload(false)
  }

  createSpace = () => {
    let createdSpace = [];
    for (let row = 0; row <= 5; row++) {
      createdSpace.push([]);
      for (let col = 0; col <= 6; col++) {
        createdSpace[row].push(0);
      }
    }
    return createdSpace;
  }

  updateSlots = (row, col, player) => {
    let currentSlots = this.state.slots;
    currentSlots[row][col] = player;
    return currentSlots;
  }

  checkWin = (owner) => {
    let col = 7;
    let row = 6;
    let copyOfSlots = this.state.slots;
    let winner = false;
    //diagonal bottom to top
    for (let i = 0; i <= col - 4; i++) {
      for (let j = 3; j <= row - 1; j++) {
        if (copyOfSlots[j][i] === owner &&
          copyOfSlots[j - 1][i + 1] === owner &&
          copyOfSlots[j - 2][i + 2] === owner &&
          copyOfSlots[j - 3][i + 3] === owner) {
          winner = true;
        }
      }
    }

    //diagonal top to bottom
    for (let i = 0; i <= col - 4; i++) {
      for (let j = 0; j <= row - 4; j++) {
        if (copyOfSlots[j][i] === owner &&
          copyOfSlots[j + 1][i + 1] === owner &&
          copyOfSlots[j + 2][i + 2] === owner &&
          copyOfSlots[j + 3][i + 3] === owner) {
          winner = true;
        }
      }
    }

    //vertical
    for (let i = 0; i <= col - 1; i++) {
      for (let j = 0; j <= row - 4; j++) {
        if (copyOfSlots[j][i] === owner &&
          copyOfSlots[j + 1][i] === owner &&
          copyOfSlots[j + 2][i] === owner &&
          copyOfSlots[j + 3][i] === owner) {
          winner = true;
        }
      }
    }

    //horizontal
    for (let i = 0; i <= row - 1; i++) {
      for (let j = 0; j <= col - 4; j++) {
        if (copyOfSlots[i][j] === owner &&
          copyOfSlots[i][j + 1] === owner &&
          copyOfSlots[i][j + 2] === owner &&
          copyOfSlots[i][j + 3] === owner) {
          winner = true;
        }
      }
    }
    return winner;
  }

  endGame = () => {
    let message;
    if (this.state.tokensLeft !== 0) {
      message = <h1>Player {this.state.currentTurn} Won!</h1>
    } else {
      message = <h1>Out of tokens. Draw!</h1>
    }
    return message;
  }

  componentDidMount() {
    this.setState((prevState) => {
      return {
        slots: this.createSpace()
      }
    })
    document.onkeydown = this.onKeyDown;
  }

  onKeyDown = (e) => {
    e = e || window.event;

    if (e.keyCode === 40) {
      if (!this.state.isDone) {
        let currentPlayer = this.state.currentTurn;
        let nextPlayer;
        let dropTo;
        let dropIt = false;

        //switch player
        if (this.state.currentTurn === 1) {
          nextPlayer = 2;
        } else {
          nextPlayer = 1;
        }

        let getColumn = Math.floor(this.state.position[1] / 100)

        //checker
        if (this.state.slots[5][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(5, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 535;
          dropIt = true;
        } else if (this.state.slots[4][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(4, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 430;
          dropIt = true;
        } else if (this.state.slots[3][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(3, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 325;
          dropIt = true;
        } else if (this.state.slots[2][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(2, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 220;
          dropIt = true;
        } else if (this.state.slots[1][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(1, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 115;
          dropIt = true;
        } else if (this.state.slots[0][getColumn] === 0) {
          this.setState(() => {
            return {
              slots: this.updateSlots(0, getColumn, this.state.currentTurn)
            };
          })
          dropTo = 10;
          dropIt = true;
        }

        if (this.checkWin(this.state.currentTurn)) {
          this.setState(() => {
            return {
              isDone: true,
              currentTurn: this.state.currentTurn
            };
          })
        }

        if (dropIt) {
          this.setState((prevState) => {
            if (this.state.isDone) {
              nextPlayer = this.state.currentTurn;
            }
            return {
              tokens: [...prevState.tokens, { player: currentPlayer, top: dropTo, left: this.state.position[1] }],
              currentTurn: nextPlayer,
              tokensLeft: prevState.tokensLeft - 1,
              position: [-50, 25]
            }

          });
        }

        if (this.state.tokensLeft === 0) {
          this.setState(() => {
            return {
              isDone: true
            }
          });
        }
      }
      //LEFT
    } else if (e.keyCode === 37 && !this.state.isDone) {
      if (this.state.position[1] !== 25 && this.state.position[1] > 25) {
        this.setState((prevState) => {
          return {
            position: [prevState.position[0], prevState.position[1] - 105]
          }
        });
      }
      //RIGHT
    } else if (e.keyCode === 39 && !this.state.isDone) {
      if (this.state.position[1] !== 760 && this.state.position[1] < 625) {
        this.setState((prevState) => {
          return {
            position: [prevState.position[0], prevState.position[1] + 105]
          }
        });
      }
    }
  }

  render() {

    return (
      <>
        <div className="game-area">
          {this.state.ready
            ? <div>
              {this.state.isDone ? this.endGame() : null}
              <div className="game-area">
                <DrawBoard />
                <Tokens 
                  isDone = {this.state.isDone} 
                  tokensLeft = {this.state.tokensLeft}
                  currentTurn = {this.state.currentTurn}
                  top = {this.state.position[0]}
                  left = {this.state.position[1]}
                  tokens = {this.state.tokens}
                />
              </div>
              {!this.state.isDone
                ? <TurnInfo
                  currentTurn={this.state.currentTurn}
                  tokensLeft={this.state.tokensLeft}
                />
                : <GameOver
                  resetGame={this.resetGame} />
              }
            </div>
            : <StartGame
              gameStart={this.gameReady} />}
        </div>
      </>
    );

  }
}

export default App;



