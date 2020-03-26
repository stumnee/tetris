import React, {  useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";

const Container = (props) => {
    const { squares, generateOrMoveBlock, squareSize, moveLeft, moveRight, drop, rotate, speedChange, speed, paused, gameOver, pauseGame, timeoutHandles } = useContext(GlobalContext);

    timeoutHandles.forEach(handle => clearTimeout(handle));
    if (!paused && !gameOver) {
        timeoutHandles.push(setTimeout(() => {
            generateOrMoveBlock()
        }, 100 * (11 - speed)));
    }

    function onInit () {

        window.addEventListener('keydown', ({key}) => {
            switch (key) {
                case 'ArrowLeft':
                    moveLeft();
                    break;
                case 'ArrowRight':
                    moveRight();
                    break;
                case ' ':               drop();
                                        break;

                case 'ArrowUp':         rotate();
                                        break;

                case '+':               speedChange(1);
                                        break;

                case '-':               speedChange(-1);
                                        break;

                case 'p':               pauseGame();
                                        break;
                default:
            }
        });
    };

    useEffect(onInit , []);

    const sq = squares.map(sq=>({
            color: sq.color,
                x: sq.x * squareSize,
                y: sq.y * squareSize
        }))
        .map((sq, idx) => <div key={idx} className="square" style={{background: sq.color, left: sq.x, top: sq.y}}/>)
    return <div className="container">{sq}</div>
};

export default Container;