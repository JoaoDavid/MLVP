import {DiagramEngine, LinkModel, NodeModel} from '@projectstorm/react-diagrams-core';
import axios from "axios";

export class ValidateLinks {

    private engine: DiagramEngine;

    constructor(engine: DiagramEngine) {
        this.engine = engine;
    }

    registerListener = () => {
        this.engine.getModel().registerListener({
            linksUpdated: (event) => {
                console.log('linksUpdated');
                console.log(event);
            },
            linkCreated: (event) => {
                console.log('linkCreated');
                console.log(event);
            },
            nodePropsUpdated: (event) => {
                console.log("nodePropsUpdated");
                console.log(event);
            },
            nodesUpdated: (event) => {
                console.log("nodesUpdated");
                console.log(event);
            }
        });
    }


    validLink = async () => {

        const model_links: LinkModel[] = this.engine.getModel().getLinks();
        const model_nodes: NodeModel[] = this.engine.getModel().getNodes();
        const links = [];
        const nodes = [];
        model_links.forEach((link) => {
            links.push({
                sourcePortId: link.getSourcePort().getID(),
                targetPortId: link.getTargetPort().getID(),
            });
        });
        model_nodes.forEach((node) => {
            nodes.push(node.serialize());
        });
        let data = {links: links, nodes: nodes}
        console.log(data)
        const response = await this.sendReq(data);
        console.log(response)
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
