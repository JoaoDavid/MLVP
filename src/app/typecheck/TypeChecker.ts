import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";
import {BaseNodeModel} from "../../components/core/BaseNode/BaseNodeModel";

export interface TypeCheckResponse {
    canLink: boolean,
    nodeAssertions: Map<string, string[]>,
    linkAssertions: Map<string, string[]>,
    unsatNodeAssertions: Map<string, string[]>,
    nodeColumns: Map<string, string>,
}

export interface DataFlowResponse {
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

    eventDataFlow = (dataFlowResponse: DataFlowResponse) => {
        this.engine.getModel().fireEvent(
            {
                dataFlowResponse: dataFlowResponse,
            },
            'dataFlowResponse'
        );
    }

    requestTypeCheck = async (diagram?) => {
        const modelBeforeDataFlow = diagram || this.engine.getModel().serialize();
        const dataFlowResponse = await axios.post('/dataFlow', modelBeforeDataFlow)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
        console.log(dataFlowResponse);
        this.eventDataFlow(dataFlowResponse);
        console.log(JSON.stringify(dataFlowResponse, null, 4));

        const modelAfterDataFlow = diagram || this.engine.getModel().serialize();
        const typeCheckResponse = await axios.post('/typeCheck', modelAfterDataFlow)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
        console.log(JSON.stringify(typeCheckResponse, null, 4));
        this.eventTypeChecked(typeCheckResponse);
        return typeCheckResponse.canLink;
    }


}
