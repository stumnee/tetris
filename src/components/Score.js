import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalState";

export default () => {
    const {score, speed, totalBlocks, totalFullLines} = useContext(GlobalContext)
    return <div className="score">
        <p>Score: {score}</p>
        <p>Speed: {speed}</p>
        <p>Blocks: {totalBlocks}</p>
        <p>Lines: {totalFullLines}</p>
    </div>
}