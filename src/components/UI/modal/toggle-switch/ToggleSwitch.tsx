import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as React from "react";
import {useState} from "react";

interface InputTitleProps {
    name: string;
    bool: boolean;
    changed: () => void;
}

const ToggleSwitch = (props: InputTitleProps) => {
    const [toggle, setToggle] = useState(props.bool)

    const toggleChanged = () => {
        setToggle(!toggle)
        props.changed();
    }
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={toggle}
                    onChange={toggleChanged}
                    color="primary"
                />
            }
            label={props.name}
        />
    )
}

export default ToggleSwitch;
