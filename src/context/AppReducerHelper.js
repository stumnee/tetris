import data from "../data";
const blocks = [];

export const getBlock = (currentBlock) => {
    return blocks[currentBlock.idx].rotations[currentBlock.rotation];
}

export const removeSquares = (currentBlock, squares) => {
    if (currentBlock) {
        squares = squares.filter((item, idx) => currentBlock.sqIndexes.indexOf(idx) === -1);
    }
    return squares;
};

export const removeFullLines = (state) => {
    let squares = state.squares,
        totalSquares = squares.length;

    for (let y = data.blocksHeight - 1; y >= 0; y--) {
        while (squares.filter(sq=>sq.y === y).length === data.blocksWidth) {
            squares = squares.filter(sq=>sq.y !== y);
            squares = squares.map(sq=> {
                if (sq.y < y) {
                    return { ...sq, y: sq.y + 1}
                }
                return sq;
            })
        }
    }

    let fullLines = (totalSquares - squares.length) / 10;

    return {
        ...state,
        squares,
        score: state.score + fullLines * fullLines * state.speed * state.speed,
        totalFullLines: state.totalFullLines + fullLines,
    }
};

export const generateBlock = () => {
    let newIdx = Math.floor(Math.random() * blocks.length);
    return {
        idx: newIdx,
            y: 0,
        x: Math.floor(data.blocksWidth / 2 - blocks[newIdx].rotations[0][0].length / 2),
        sqIndexes: [],
        rotation: 0
    }
};

export const squaresOverlap = (currentBlock, squares, blockX, blockY) => {
    let block = getBlock(currentBlock);
    if (!blockY)
        blockY = currentBlock.y;
    if (!blockX)
        blockX = currentBlock.x;

    for (let lineIdx = 0; lineIdx < block.length; lineIdx++) {
        const line = block[lineIdx];
        for (let i = 0; i < line.length; i++) {
            if (line.charAt(i) !== ' ') {
                const x = blockX + i,
                    y = blockY + lineIdx;

                if (x < 0 || x >= data.blocksWidth || y >= data.blocksHeight) {
                    return true;
                }
                if (squares.find(sq=>sq.x===x && sq.y===y)) {
                    return true;
                }
            }
        }
    }
    return false;
};

export const drawSquares = (currentBlock, squares) => {
    currentBlock.sqIndexes = [];

    getBlock(currentBlock).forEach((line, lineIdx) => {
        for (let i = 0; i < line.length; i++) {
            if (line.charAt(i) !== ' ') {
                squares.push({
                    x: currentBlock.x + i,
                    y: currentBlock.y + lineIdx,
                    color:blocks[currentBlock.idx].color
                });
                currentBlock.sqIndexes.push(squares.length - 1);
            }
        }
    });
    return squares;
};

export const constrain = (value, min, max) => {
    if (value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}


/**
 * Takes Array of strings and returns 90 degree rotation
 * @param arr
 */
function rotate(arr) {
    let rot = [];
    for (let i = 0; i < arr[0].length; i++) {
        rot.push(arr.map(item=>item[i]).reverse().join(""))
    }
    return rot;
}

// Load Blocks
let startOfBlock = -1;
for (let i = 0; i <= data.blocks[0].length; i++) {
    if (data.blocks.map(line=>line.charAt(i)).filter(ch => ch !== ' ' && ch !== '').length === 0) {
        if (startOfBlock > -1) {
            let start = startOfBlock,
                rotations = [],
                rot = data.blocks
                            .map(line => line.substring(start, i))
                            .filter(line => line.trim() !== "");

            for (let i = 0; i < 4; i++) {
                rotations.push(rot);
                rot = rotate(rot);

            }
            blocks.push({
                color: data.colors[blocks.length],
                rotations
            });
            startOfBlock = -1;
        }
        continue;
    }
    if (startOfBlock === -1) {
        startOfBlock = i;
    }
}