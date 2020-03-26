import React, {useContext} from 'react'
import { GlobalContext } from "../context/GlobalState";
export default () => {
    const { paused } = useContext(GlobalContext);
    if (paused)
        return <div className="paused">Game Paused</div>
    else
        return null;
}