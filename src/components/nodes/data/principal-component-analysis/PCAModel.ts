import {BaseNodeModel} from "../../../core/BaseNode/BaseNodeModel";
import {DatasetPortModel} from "../../../ports/dataset/DatasetPortModel";
import {PCA} from "../DataConfig";
import {DeserializeEvent} from "@projectstorm/react-canvas-core";
import {Column} from "../import-dataset/Column";


export class PCAModel extends BaseNodeModel {

    private columns: Column[] = [];
    private randomState: number = 0;
    private numComponents: number = 1;

    constructor() {
        super(PCA);
        this.addInPort();
        this.addOutPort();
    }

    getRandomState(): number {
        return this.randomState;
    }

    setRandomState(value: number) {
        this.randomState = value;
    }

    getNumComponents(): number {
        return this.numComponents;
    }

    setNumComponents(value: number) {
        this.numComponents = value;
    }

    protected addInPort(): void {
        const p = new DatasetPortModel(true);
        super.addPort(p);
    }

    protected addOutPort(): void {
        const p = new DatasetPortModel(false, "Reduced Dataset");
        super.addPort(p);
    }

    deserialize(event: DeserializeEvent<this>) {
        super.deserialize(event);
        this.randomState = event.data.randomState;
        this.numComponents = event.data.numComponents;
    }

    serialize(): any {
        return {
            ...super.serialize(),
            randomState: this.randomState,
            numComponents: this.numComponents,
        };
    }

    getColumns() {
        return this.columns;
    }

    updateLink = () => {
        if (!this.isVisited()) {
            console.log("Oversampling update LInk")
            this.updateInputLinks();
            let inPort = this.getInPorts()[0] as DatasetPortModel;
            let outPort = this.getOutPorts()[0] as DatasetPortModel;
            this.columns = [];
            for (let i = 0; i < this.numComponents; i++) {
                this.columns.push(Column.createColumn("V" + i, "float", 0));
            }
            this.columns.push(inPort.getColumns().slice(-1).pop());

            outPort.setColumns(this.columns);
            this.setVisited();
            this.updateOutputLinks();
        }
    }


}
