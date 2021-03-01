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


    validateLinks = () => {
        const data:{
            sourcePortId: string,
            targetPortId: string,
            sourceNode: object,
            targetNode: object,
        }[] = [];
        const links:LinkModel[] = this.engine.getModel().getLinks();
        console.log("validateLinks  LINKS");
        console.log(links);
        links.forEach((link)=> {
            data.push({
                sourcePortId: link.getSourcePort().getID(),
                targetPortId: link.getTargetPort().getID(),
                sourceNode: link.getSourcePort().getNode().serialize(),
                targetNode: link.getTargetPort().getNode().serialize(),
            });
            console.log(link.getSourcePort().getNode());
            console.log(link.getTargetPort().getNode());
        });
        return this.sendReq(data);
    }

    sendReq = (data) => {
        console.log(data)
        let res = false;
        axios.post('/z3', data)
            .then(response => {
                res = response.data==="sat";
                console.log(response);
                console.log(response.data);
                console.log("return res is " + res);
            })
            .catch(error => {
                console.log(error);
            });
        console.log("return res is " + res);
        return res;
    }




}
