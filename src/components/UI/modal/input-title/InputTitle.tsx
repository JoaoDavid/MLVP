import React, {useRef, useEffect} from 'react';
import classes from './InputTitle.module.css';

interface InputTitleProps {
    title: string;
    changeTextHandler: (event:React.ChangeEvent<HTMLInputElement>) => void;
    finishEditingText: () => void;
}

const InputTitle = (props: InputTitleProps) => {
    const inputElement = useRef(null);

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    return (
        <input className={classes.InputTitle} ref={inputElement} onChange={props.changeTextHandler} value={props.title} onBlur={props.finishEditingText} maxLength={25}/>
    )
}

export default InputTitle;
