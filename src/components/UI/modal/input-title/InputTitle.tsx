import React, {useRef, useEffect, useState} from 'react';
import classes from './InputTitle.module.css';

interface InputTitleProps {
    title: string;
    saveTitle: (title: string) => void;
    finishEditingText: () => void;
}

const InputTitle = (props: InputTitleProps) => {
    const [title, setTitle] = useState(props.title);
    const inputElement = useRef(null);

    const changeTextHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setTitle(event.target.value);
            props.saveTitle(event.target.value);
        }
    }

    useEffect(() => {
        if (inputElement.current) {
            inputElement.current.focus();
        }
    }, []);

    return (
        <input className={classes.InputTitle} ref={inputElement} onChange={changeTextHandler} value={title} onBlur={props.finishEditingText} maxLength={40}/>
    )
}

export default InputTitle;
