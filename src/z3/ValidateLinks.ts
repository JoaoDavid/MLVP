import {DiagramEngine, LinkModel, NodeModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";
import {MyDiagramListener} from "../components/UI/canvas/diagram/MyDiagramModel";

export interface AssertionsReqData {
    links: string[],
    nodes: string[],
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

    eventProblemsFound = (problems: string[]) => {
        this.engine.getModel().fireEvent(
            {
                problems: problems,
            },
            'problemsFound'
        );
    }


    validLink = async (newLink: LinkModel) => {

        const model_links: LinkModel[] = this.engine.getModel().getLinks();
        const model_nodes: NodeModel[] = this.engine.getModel().getNodes();
        const index = model_nodes.indexOf(newLink.getTargetPort().getNode(), 0);

        // place the target node at the end of the model_nodes array
        if (index > -1) {
            console.log("found it")
            model_nodes.splice(index, 1);
            model_nodes.push(newLink.getTargetPort().getNode());
        }
        const links = [];
        const nodes = [];
        model_links.forEach((link) => {
            links.push({
                linkId: link.getID(),
                sourceNodeId: link.getSourcePort().getNode().getID(),
                sourcePortId: link.getSourcePort().getID(),
                targetNodeId: link.getTargetPort().getNode().getID(),
                targetPortId: link.getTargetPort().getID(),
            });
        });
        model_nodes.forEach((node) => {
            nodes.push(node.serialize());
        });
        let data = {links: links, nodes: nodes}
        console.log(data)
        const response = await this.sendReq(data);
        console.log(JSON.stringify(response, null, 4));
        const canLink = response.canLink;
        if (!canLink) {
            this.eventProblemsFound(response.problems);
        }
        return response.canLink;
    }

    sendReq = async (data: AssertionsReqData) => {
        return axios.post('/z3', data)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }

}
