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
                    Existing Visual Programming tools for building Machine Learning pipelines approach pipeline creation from a dynamic point of
                    view. Datasets are fully loaded into the tool so that the pipeline re-executes as the data scientist modifies it.
                    <br/>
                    MLVP improves over existing said tools by separating the pipeline’s creation and execution environments.
                    Instead of having a dynamic execution of the pipeline as it changes and
                    requiring it to execute inside the tool, our approach features a compiler that translates the pipeline
                    into an executable code. The code can then execute in a cluster for increased performance and
                    better handling of big data.
                </p>
            </Col>
        </AppModal>
    )
}

export default AboutModal;
