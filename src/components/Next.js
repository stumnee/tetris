import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalState";

export default () => {
    const { nextSquares, squareSize } = useContext(GlobalContext);

    const sq = nextSquares.map(sq=>({
        color: sq.color,
        x: sq.x * squareSize,
        y: sq.y * squareSize
    }))
        .map((sq, idx) => <div key={idx} className="square" style={{background: sq.color, left: sq.x, top: sq.y}}/>)

    return <div className="next">
        <p>Next:</p>

        <div className="container-next">{sq}</div>

        <div className="instruction">
            <div><span>&uarr;</span><span>Rotate</span></div>
            <div><span>&larr;</span><span>Left</span></div>
            <div><span>&rarr;</span><span>Right</span></div>
            <div><span>Space</span><span>Drop</span></div>
            <div><span>p</span><span>Pause</span></div>
            <div><span>+/-</span><span>Speed Up/Down</span></div>
        </div>
    </div>
}