import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as React from "react";

interface InputTitleProps {
    name: string;
    getBool: () => boolean;
    changed: () => void;
}

const ToogleSwitch = (props: InputTitleProps) => {

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={props.getBool()}
                    onChange={props.changed}
                    color="primary"
                />
            }
            label={props.name}
        />
    )
}

export default ToogleSwitch;
