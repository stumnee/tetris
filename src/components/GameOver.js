import React, {useContext} from 'react'
import { GlobalContext } from "../context/GlobalState";
export default () => {
    const { gameOver } = useContext(GlobalContext);
    if (gameOver)
    // eslint-disable-next-line no-restricted-globals
        return <div className="game-over">Game Over. <i className="fa fa-refresh" onClick={()=>{location.reload()}}></i></div>
    else
        return null;
}