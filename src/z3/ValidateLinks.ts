import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";

export interface TypecheckingResponse {
    canLink: boolean,
    nodeAssertions: Map<string, string[]>,
    linkAssertions: Map<string, string[]>,
    unsatNodeAssertions: Map<string, string[]>,
}

export class ValidateLinks {

    private engine: DiagramEngine;

    constructor(engine: DiagramEngine) {
        this.engine = engine;
    }


    eventLinkCreated = (link: LinkModel) => {
        this.engine.getModel().fireEvent(
            {
                sourceNode: link.getSourcePort().getNode(),
                targetNode: link.getTargetPort().getNode(),
            },
            'linkCreated'
        );
    }

    eventTypechecking = (typechecking: TypecheckingResponse) => {
        this.engine.getModel().fireEvent(
            {
                typechecking: typechecking,
            },
            'typechecking'
        );
    }

    requestTypechecking = async () => {
        const data = this.engine.getModel().serialize();
        const response = await axios.post('/z3', data)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
        console.log(JSON.stringify(response, null, 4));
        this.eventTypechecking(response);
        return response.canLink;
    }


}
