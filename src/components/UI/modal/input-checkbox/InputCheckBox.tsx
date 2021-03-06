import React, {useState} from 'react';
import classes from '../../modal/BaseModal.module.css';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

interface InputCheckBoxProps {
    name: string;
    checked: boolean;
    setChecked: (value: boolean) => void;
    value: number;
    setValue: (value: number) => void;
}

const InputCheckBox = (props: InputCheckBoxProps) => {
    const [checked, setCheckState] = useState(props.checked);
    const [value, setValue] = useState(props.value);

    const updateCheckBox = () => {
        setCheckState(!checked);
        props.setChecked(!checked);
        if (checked) {
            setValue(value)
        }
    }

    const valueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(+event.target.value);
        setValue(+event.target.value);
    }

    return (
        <>
            <Form.Label>{props.name}</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Checkbox defaultChecked={checked} onChange={updateCheckBox}
                                         aria-label="Checkbox for following text input"/>
                </InputGroup.Prepend>
                <Form.Control className={classes.Inputs} disabled={!checked} type="number"
                              value={checked?value:""} onChange={valueChanged}/>
            </InputGroup>
        </>
    )
}

export default InputCheckBox;
