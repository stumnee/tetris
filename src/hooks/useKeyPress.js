import {useEffect, useState} from 'react';

export default function useKeyPress() {
    const [keyPressed, setKeyPressed] = useState(null);
    const downHandler = ({key}) => {
        setKeyPressed(key)
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);

        return()=> {
            window.removeEventListener('keydown', downHandler);
        }
    }, []);

    return keyPressed;
}