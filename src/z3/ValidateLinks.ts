import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';
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
        const data: {
            sourcePortId: string,
            targetPortId: string,
            sourceNode: object,
            targetNode: object,
        }[] = [];
        const links: LinkModel[] = this.engine.getModel().getLinks();
        console.log("validateLinks  LINKS");
        console.log(links);
        links.forEach((link) => {
            data.push({
                sourcePortId: link.getSourcePort().getID(),
                targetPortId: link.getTargetPort().getID(),
                sourceNode: link.getSourcePort().getNode().serialize(),
                targetNode: link.getTargetPort().getNode().serialize(),
            });
            console.log(link.getSourcePort().getNode());
            console.log(link.getTargetPort().getNode());
        });
        const isSat = await this.sendReq(data);
        console.log(isSat);
        console.log(isSat === "sat");
        return isSat === "sat";
    }

    sendReq = async (data) => {
        return axios.post('/z3', data)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }

}
