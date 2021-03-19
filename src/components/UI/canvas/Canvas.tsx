import React, {DragEvent} from 'react';
import {DiagramEngine} from "@projectstorm/react-diagrams";
import {CanvasWidget} from "@projectstorm/react-canvas-core";
import classes from "./Canvas.module.css";

interface CanvasProps {
    engine: DiagramEngine,
    onDropCanvas: (event: DragEvent<HTMLDivElement>) => void,
}

const Canvas = (props: CanvasProps) => {

    return (
        <div className={classes.Container}
             onDragOver={(event) => {
                 event.preventDefault()
             }}
             onDrop={props.onDropCanvas}
        >
            <CanvasWidget className={classes.DiagramContainer} engine={props.engine}/>
        </div>
    )
}

export default Canvas;
