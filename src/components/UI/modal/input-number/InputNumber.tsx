import React, {useState} from 'react';
import classes from '../../modal/BaseModal.module.css';
import Form from "react-bootstrap/Form";

interface InputNumberProps {
    name: string;
    value: number;
    setValue: (value: number) => void;
    decimal?: boolean;
}

const InputNumber = (props: InputNumberProps) => {
    const [value, setValue] = useState(props.value);

    const valueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(+event.target.value);
        setValue(+event.target.value);
    }

    let step = props.decimal?"0.01":"1";

    return (
        <>
            <Form.Label>{props.name}</Form.Label>
            <Form.Control className={classes.Inputs} type="number" step={step}
                          value={value} onChange={valueChanged}/>
        </>
    )
}

export default InputNumber;
