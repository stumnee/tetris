import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";
import data from '../data'

const initialState = {
    squares: [],
    nextSquares: [],
    blocks: [],
    totalBlocks: 0,
    totalFullLines: 0,
    score: 0,
    speed: 5,
    paused: false,
    gameOver: false,
    timeoutHandles: [],
    nextBlock: null,
    currentBlock: null
};



export const GlobalContext = createContext(initialState);

export const  GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const {speed, score, squares, nextSquares, nextBlock, paused, gameOver, totalBlocks, totalFullLines, timeoutHandles} = state;

    return (<GlobalContext.Provider value={{
        squares,
        nextSquares,
        nextBlock,
        score,
        speed,
        paused,
        gameOver,
        totalBlocks,
        totalFullLines,
        timeoutHandles,
        squareSize: data.squareSize,
        moveLeft: () => {
            dispatch({
                type: 'MOVE_LEFT_RIGHT',
                payload: -1
            });
        },
        moveRight: () => {
            dispatch({
                type: 'MOVE_LEFT_RIGHT',
                payload: 1
            });
        },
        drop: () => {
            dispatch({
                type: 'DROP'
            });
        },
        rotate: () => {
            dispatch({
                type: 'ROTATE'
            });
        },
        generateOrMoveBlock: () => {
            dispatch({
                type: 'GENERATE_MOVE_BLOCK'
            });
        },
        speedChange: (diff) => {
            dispatch({
                type: 'SPEED_CHANGE',
                diff: diff
            });
        },
        pauseGame: () => {
            dispatch({
                type: 'PAUSE_GAME'
            })
        }
    }}>
        {children}
    </GlobalContext.Provider>);
};