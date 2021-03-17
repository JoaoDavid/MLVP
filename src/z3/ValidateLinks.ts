import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";

export interface VerificationResponse {
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


    eventLinkCreated = (link:LinkModel) => {
        this.engine.getModel().fireEvent(
            {
                sourceNode: link.getSourcePort().getNode(),
                targetNode: link.getTargetPort().getNode(),
            },
            'linkCreated'
        );
    }

    eventProblemsFound = (assertionProblem: VerificationResponse) => {
        this.engine.getModel().fireEvent(
            {
                assertionProblem: assertionProblem,
            },
            'problemsFound'
        );
    }


    validLink = async () => {
        const data = this.engine.getModel().serialize();
        const response = await this.sendReq(data);
        console.log(JSON.stringify(response, null, 4));
        const canLink = response.canLink;
        if (!canLink) {
            this.eventProblemsFound(response);
        }
        return response.canLink;
    }

    sendReq = async (data) => {
        return axios.post('/z3', data)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }

}
