import React from 'react';
import AppModal from "./AppModal";
import Col from "react-bootstrap/Col";

interface AboutModalProps {
}

const AboutModal = (props: AboutModalProps) => {
    return (
        <AppModal title={"About"}>
            <Col>
                <p/>
                <h5>Motivation</h5>
                <p>
                    The need to detect not only semantic
                    problems with a Machine Learning pipeline,
                    but also practical mistakes before run time
                    motivated the design of MLVP, a tool for data
                    scientists where pipelines are created by
                    dragging and linking nodes together, each
                    node performing a specific operation over
                    the data, forwarding the result to the output
                    port/s.
                </p>
            </Col>
        </AppModal>
    )
}

export default AboutModal;
