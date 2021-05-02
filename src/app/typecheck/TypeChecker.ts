import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";

export interface TypeCheckResponse {
    canLink: boolean,
    nodeAssertions: Map<string, string[]>,
    linkAssertions: Map<string, string[]>,
    unsatNodeAssertions: Map<string, string[]>,
    nodeColumns: Map<string, string>,
}

export class TypeChecker {

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

    eventTypeChecked = (typeCheckResponse: TypeCheckResponse) => {
        this.engine.getModel().fireEvent(
            {
                typeCheckResponse: typeCheckResponse,
            },
            'typeCheckResponse'
        );
    }

    requestTypeCheck = async (diagram?) => {
        const data = diagram || this.engine.getModel().serialize();
        const response = await axios.post('/typeCheck', data)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
        // console.log(JSON.stringify(response, null, 4));
        this.eventTypeChecked(response);
        return response.canLink;
    }


}
