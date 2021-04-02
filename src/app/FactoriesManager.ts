import {DiagramEngine} from "@projectstorm/react-diagrams";
import {AbstractDsFactory} from "../components/nodes/data/import-dataset/abstract/AbstractDsFactory";
import {CSVFactory} from "../components/nodes/data/import-dataset/csv/CSVFactory";
import {RandomForestClassifierFactory} from "../components/nodes/model/classifier/random-forest-classifier/RandomForestClassifierFactory";
import {OversamplingFactory} from "../components/nodes/data/oversampling/OversamplingFactory";
import {UndersamplingFactory} from "../components/nodes/data/undersampling/UndersamplingFactory";
import {PCAFactory} from "../components/nodes/data/principal-component-analysis/PCAFactory";
import {AccuracyClassifierFactory} from "../components/nodes/evaluate/classifier/accuracy/AccuracyClassifierFactory";
import {SplitDatasetFactory} from "../components/nodes/data/split-dataset/SplitDatasetFactory";
import {CrossValidationClassifierFactory} from "../components/nodes/evaluate/classifier/cross-validation/CrossValidationClassifierFactory";
import {DatasetPortFactory} from "../components/ports/dataset/DatasetPortFactory";
import {ClassifierPortFactory} from "../components/ports/model/ClassifierPortFactory";
import {SampleFactory} from "../components/nodes/data/import-dataset/sample/SampleFactory";
import {FeatureEngineeringFactory} from "../components/nodes/data/feature-engineering/FeatureEngineeringFactory";


export class FactoriesManager {

    private engine: DiagramEngine;

    constructor(engine: DiagramEngine) {
        this.engine = engine;
    }

    registerNodeFactories = () => {
        this.engine.getNodeFactories().registerFactory(AbstractDsFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(CSVFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(SampleFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(RandomForestClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(OversamplingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(UndersamplingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(PCAFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(FeatureEngineeringFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(AccuracyClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(SplitDatasetFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(CrossValidationClassifierFactory.getInstance());
    }

    registerPortFactories = () => {
        this.engine.getPortFactories().registerFactory(DatasetPortFactory.getInstance());
        this.engine.getPortFactories().registerFactory(ClassifierPortFactory.getInstance());
    }

    delDefaultFactory = () => {
        console.log(this.engine.getNodeFactories());
        console.log("....");
        //this.state.engine.getNodeFactories().deregisterFactory('default');
        console.log(this.engine.getNodeFactories().getFactories().forEach(factory => {
            console.log(factory.getType());
            console.log(factory);
        }));
        console.log("....");
    }

}
