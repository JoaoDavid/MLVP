import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as React from "react";

interface InputTitleProps {
    name: string;
    bool: boolean;
    changed: () => void;
}

const ToggleSwitch = (props: InputTitleProps) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={props.bool}
                    onChange={props.changed}
                    color="primary"
                />
            }
            label={props.name}
        />
    )
}

export default ToggleSwitch;
