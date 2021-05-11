import {DiagramEngine} from "@projectstorm/react-diagrams";
import {AbstractDsFactory} from "../components/nodes/data-source/abstract/AbstractDsFactory";
import {CSVFactory} from "../components/nodes/data-source/csv/CSVFactory";
import {RandomForestClassifierFactory} from "../components/nodes/classification/random-forest-classifier/RandomForestClassifierFactory";
import {OversamplingFactory} from "../components/nodes/data-balancing/oversampling/OversamplingFactory";
import {UndersamplingFactory} from "../components/nodes/data-balancing/undersampling/UndersamplingFactory";
import {PCAFactory} from "../components/nodes/data-transformation/principal-component-analysis/PCAFactory";
import {AccuracyClassifierFactory} from "../components/nodes/classifier-evaluation/accuracy/AccuracyClassifierFactory";
import {SplitDatasetFactory} from "../components/nodes/data-balancing/split-dataset/SplitDatasetFactory";
import {CrossValidationClassifierFactory} from "../components/nodes/classifier-evaluation/cross-validation/CrossValidationClassifierFactory";
import {DatasetPortFactory} from "../components/ports/dataset/DatasetPortFactory";
import {ClassifierPortFactory} from "../components/ports/model/ClassifierPortFactory";
import {SampleFactory} from "../components/nodes/data-source/sample/SampleFactory";
import {FeatureEngineeringFactory} from "../components/nodes/data-transformation/feature-engineering/FeatureEngineeringFactory";
import {VisualizeDatasetFactory} from "../components/nodes/visualization/visualize-dataset/VisualizeDatasetFactory";
import {TemporalAggregationFactory} from "../components/nodes/data-transformation/temporal-aggregation/TemporalAggregationFactory";
import {RandomForestRegressorFactory} from "../components/nodes/regression/random-forest-regressor/RandomForestRegressorFactory";
import {RegressorPortFactory} from "../components/ports/model/RegressorPortFactory";
import {EvaluateRegressorFactory} from "../components/nodes/regressor-evaluation/evaluate-regressor/EvaluateRegressorFactory";
import {LabelEncodingFactory} from "../components/nodes/data-transformation/label-encoding/LabelEncodingFactory";
import {LabelDecodingFactory} from "../components/nodes/data-transformation/label-decoding/LabelDecodingFactory";
import {OneHotEncodingFactory} from "../components/nodes/data-transformation/one-hot-encoding/OneHotEncodingFactory";
import {OneHotDecodingFactory} from "../components/nodes/data-transformation/one-hot-decoding/OneHotDecodingFactory";
import {SVMClassifierFactory} from "../components/nodes/classification/svm-classifier/SVMClassifierFactory";
import {KNearestNeighborsClassifierFactory} from "../components/nodes/classification/k-nearest-neighbors-classifier/KNearestNeighborsClassifierFactory";
import {DecisionTreeClassifierFactory} from "../components/nodes/classification/decision-tree-classifier/DecisionTreeClassifierFactory";
import {LinearRegressionFactory} from "../components/nodes/regression/linear-regression/LinearRegressionFactory";
import {LogisticRegressionFactory} from "../components/nodes/regression/logistic-regression/LogisticRegressionFactory";
import {SVMRegressorFactory} from "../components/nodes/regression/svm-regressor/SVMRegressorFactory";


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
        this.engine.getNodeFactories().registerFactory(RandomForestRegressorFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(OversamplingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(UndersamplingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(PCAFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(FeatureEngineeringFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(AccuracyClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(SplitDatasetFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(CrossValidationClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(VisualizeDatasetFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(TemporalAggregationFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(EvaluateRegressorFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(LabelEncodingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(LabelDecodingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(OneHotEncodingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(OneHotDecodingFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(SVMClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(KNearestNeighborsClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(DecisionTreeClassifierFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(LinearRegressionFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(LogisticRegressionFactory.getInstance());
        this.engine.getNodeFactories().registerFactory(SVMRegressorFactory.getInstance());
    }

    registerPortFactories = () => {
        this.engine.getPortFactories().registerFactory(DatasetPortFactory.getInstance());
        this.engine.getPortFactories().registerFactory(ClassifierPortFactory.getInstance());
        this.engine.getPortFactories().registerFactory(RegressorPortFactory.getInstance());
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
