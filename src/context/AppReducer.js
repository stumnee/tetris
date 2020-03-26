import {
    drawSquares,
    removeSquares,
    squaresOverlap,
    generateBlock, getBlock, removeFullLines, constrain
} from "./AppReducerHelper";

export default (state, action) => {
    const {currentBlock, squares, totalBlocks, speed} = state;
    const {x, y, rotation} = currentBlock || {};
    let currentBlockUpdated;

    let squaresUpdated = removeSquares(currentBlock, squares);

    switch(action.type) {
        case 'MOVE_LEFT_RIGHT':
            let xUpdated = x + action.payload;
            currentBlockUpdated = { ...currentBlock, x: xUpdated };

            if (squaresOverlap(currentBlockUpdated, squaresUpdated, xUpdated, y)) {
                return state;
            }
            return {
                ...state,
                paused: false,
                currentBlock: currentBlockUpdated,
                squares: drawSquares(currentBlockUpdated, squaresUpdated)
            };

        case 'DROP':
            let yy = y;
            currentBlockUpdated = currentBlock;
            while (!squaresOverlap(currentBlockUpdated, squaresUpdated, x, yy)) {
                yy++;
            }
            currentBlockUpdated = { ...currentBlock, y: yy - 1 };

            return removeFullLines({
                ...state,
                paused: false,
                currentBlock: currentBlockUpdated,
                squares: drawSquares(currentBlockUpdated, squaresUpdated)
            });

        case 'ROTATE':
            currentBlockUpdated = {
                ...currentBlock,
                rotation: (rotation + 1) % 4
            };

            let dW = getBlock(currentBlock)[0].length - getBlock(currentBlockUpdated)[0].length;
            if (dW > 1) dW = 1;
            if (dW  < -1) dW = -1;
            currentBlockUpdated.x += dW;

            if (squaresOverlap(currentBlockUpdated, squaresUpdated)) {
                return state;
            }

            return {
                ...state,
                paused: false,
                currentBlock: currentBlockUpdated,
                squares: drawSquares(currentBlockUpdated, squaresUpdated)

            };

        case 'GENERATE_MOVE_BLOCK':
            if (currentBlock && !squaresOverlap(currentBlock, squaresUpdated, x, y + 1 )) {
                currentBlockUpdated = {...currentBlock, y: y + 1};
                return {
                    ...state,
                    currentBlock: currentBlockUpdated,
                    squares: drawSquares(currentBlockUpdated, squaresUpdated)
                }
            }
            // generate
            let newState = removeFullLines(state);

            currentBlockUpdated = state.nextBlock || generateBlock();
            currentBlockUpdated.blockIndex = totalBlocks;
            let nextBlock = generateBlock();

            return {
                ...newState,
                currentBlock: currentBlockUpdated,
                nextBlock: nextBlock,
                gameOver: squaresOverlap(currentBlockUpdated, newState.squares),
                totalBlocks: currentBlockUpdated.blockIndex + 1,
                nextSquares: drawSquares(nextBlock, []),
                squares: drawSquares(currentBlockUpdated, newState.squares)
            };

        case 'PAUSE_GAME':
            return {
                ...state,
                paused: !state.paused && !state.gameOver
            };
        case 'SPEED_CHANGE':
            return {
                ...state,
                speed: constrain(speed + action.diff, 1, 10)
            };

        default:
            return state;
    }
}