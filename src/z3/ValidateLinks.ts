import {DiagramEngine, LinkModel} from '@projectstorm/react-diagrams-core';

export class ValidateLinks {

    private engine: DiagramEngine;

    constructor(engine: DiagramEngine) {
        this.engine = engine;
    }


    validateLinks = () => {
        const links:LinkModel[] = this.engine.getModel().getLinks();
        links.forEach((link)=> {
            console.log(link.getSourcePort().getNode());
            console.log(link.getTargetPort().getNode());
            console.log(link);
        })
    }




}
