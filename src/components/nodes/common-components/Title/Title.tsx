import React from 'react';
import classes from './Title.module.css';

interface TitleProps {
    name: string
}

const title = (props: TitleProps) => {
    return (
        <div className={classes.Title}>
            <div className={classes.TitleName}>{props.name}</div>
        </div>

    )
}

export default title;