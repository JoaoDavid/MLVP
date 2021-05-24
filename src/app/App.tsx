import React from 'react';
import classes from './App.module.css';
import TopNav from '../components/UI/top-nav/TopNav';
import SideBar from "../components/UI/side-bar/SideBar";
import axios from "axios";
import download from 'js-file-download';
import BottomNav from "../components/UI/bottom-nav/BottomNav";
import Canvas from "../components/UI/canvas/Canvas";
import {MyDiagramModel} from "./diagram/MyDiagramModel";
import splitEvaluate from '../demos/split-n-evaluate.json';
import posterDemo from '../demos/poster-demo.json';
import encodeDecode from '../demos/encode_decode_demo.json';
import {BaseNodeModel} from "../components/core/BaseNode/BaseNodeModel";
import {DefaultLinkModel} from "@projectstorm/react-diagrams-defaults";
import {CATEGORIES} from "../components/nodes/Config";
import {Button, Modal} from "react-bootstrap";
import {CanvasManager} from "./CanvasManager";

interface AppProps {

}

type AppState = {
    unsatNodeAssertions: Map<BaseNodeModel, string[]>,
    allNodeAssertions: Map<BaseNodeModel, string[]>,
    allLinkAssertions: Map<DefaultLinkModel, string[]>,
    log: string[],
    showCanvas: boolean,
    showModal: boolean,
    modal: React.ReactNode,
};

class App extends React.Component<AppProps, AppState> {

    private readonly canvasManager = new CanvasManager("app_canvas");

    constructor(props: AppProps) {
        super(props);
        this.state = {
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
            log: [],
            showCanvas: true,
            showModal: false,
            modal: null,
        }
        this.canvasManager.registerBasicMLCanvas();
        this.newCanvas();
    }

    registerListeners = (model: MyDiagramModel) => {
        model.registerListener({
            hideCanvas: (event) => {
                console.log('event: hideCanvas');
                console.log(event);
                this.toggleCanvasLock();
            }, linksUpdated: (event) => {
                console.log('event: linksUpdated');
                console.log(event);
            },
            linkCreated: (event) => {
                console.log('event: linkCreated');
                console.log(event);
                // this.typeChecker.requestTypeCheck();
            },
            nodeUpdated: (event) => {
                console.log("event: nodeUpdated");
                console.log(event);
                this.canvasManager.getTypeChecker().requestTypeCheck();
            },
            nodesUpdated: (event) => {
                console.log("event: nodesUpdated");
                console.log(event);
            },
            typeCheckResponse: (event) => {
                console.log("event: typeCheckResponse");
                console.log(event);
                const allNodeAssertions = this.canvasManager.processNodeAssertions(event.typeCheckResponse.nodeAssertions);
                const allLinkAssertions = this.canvasManager.processLinkAssertions(event.typeCheckResponse);
                const unsatNodeAssertions = this.canvasManager.processNodeAssertions(event.typeCheckResponse.unsatNodeAssertions);
                // this.processNodeColumns(event.typeCheckResponse.nodeColumns);
                this.setState({
                    unsatNodeAssertions: unsatNodeAssertions,
                    allNodeAssertions: allNodeAssertions,
                    allLinkAssertions: allLinkAssertions,
                });
                this.canvasManager.getEngine().repaintCanvas();
            },
            dataFlowResponse: (event) => {
                console.log("event: typeCheckResponse");
                this.canvasManager.processNodeColumns(event.dataFlowResponse.nodeColumns);
                this.setState({});
                this.canvasManager.getEngine().repaintCanvas();
            },
            modalContent: (event) => {
                console.log("event: modalContent");
                this.setState({modal: event.modal});
                this.openModal();
                this.canvasManager.getEngine().repaintCanvas();
            }
        });
    }

    loadDemos = () => {
        const map = new Map<String, () => void>();
        map.set("Simple Pipeline", () => {
            this.canvasManager.loadModel(splitEvaluate);
            this.updateLog("Loaded demo Simple Pipeline");
        });
        map.set("Poster - Balanced Dataset Problem", () => {
            this.canvasManager.loadModel(posterDemo);
            this.updateLog("Loaded demo Poster - Balanced Dataset Problem");
        });
        map.set("Encode Decode Demo", () => {
            this.canvasManager.loadModel(encodeDecode);
            this.updateLog("Loaded demo Encode Decode Demo");
        });
        return map;
    }

    newCanvas = () => {
        let model = this.canvasManager.newCanvas();
        this.registerListeners(model);
        this.updateLog("New canvas");
        this.setState({
            unsatNodeAssertions: new Map(),
            allNodeAssertions: new Map(),
            allLinkAssertions: new Map(),
        });
    }

    openSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList.length > 0) {
            event.target.files[0].text().then((text: string) => {
                this.canvasManager.loadModel(JSON.parse(text));
            });
            this.updateLog("Loaded save file " + event.target.files[0].name);
        }
        event.target.value = "";
    }

    downloadSave = () => {
        const data = this.canvasManager.getEngine().getModel().serialize();
        download(JSON.stringify(data, null, 4), 'mlvp.json');
    }

    requestCompilation = () => {
        const data = this.canvasManager.getEngine().getModel().serialize();
        axios.post('/compile', data)
            .then(response => {
                if (response.data.successful) {
                    console.log(response);
                    console.log(response.data);
                    download(response.data.code, "mlvp-generated-code.py")
                    this.updateLog("Compiled successfully!");
                } else {
                    this.updateLog("Compiled with errors!");
                    this.updateLog("Make sure that all input ports within the pipeline are connected to another node!");
                    this.canvasManager.getTypeChecker().eventTypeChecked(response.data);
                }
            })
            .catch(error => {
                console.log(error);
                this.updateLog("Error occurred while compiling");
            });
    }

    compile = () => {
        if (this.state.unsatNodeAssertions.size === 0) {
            this.requestCompilation();
        } else {
            this.updateLog("Cannot compile with problems!");
        }
    }

    updateLog = (message: string) => {
        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        const auxLog = this.state.log;
        auxLog.push(time + " " + message);
        this.setState({log: auxLog});
    }

    toggleCanvasLock = () => {
        this.canvasManager.getEngine().getModel().setLocked(!this.canvasManager.getEngine().getModel().isLocked());
    }

    closeModal = () => {
        this.setState({showModal: false});
        this.canvasManager.getEngine().getModel().setLocked(false);
    }

    openModal = () => {
        this.setState({showModal: true})
        this.canvasManager.getEngine().getModel().setLocked(true);
    }

    render() {
        return (
            <div className={classes.FrontPage}>
                <TopNav newCanvas={this.newCanvas} open={this.openSave} save={this.downloadSave}
                        compile={this.compile} loadDemos={this.loadDemos()}/>
                <>
                    <Modal animation={false} size="xl" show={this.state.showModal} onHide={this.closeModal}>
                        {this.state.modal}
                    </Modal>
                </>
                <Button onClick={this.toggleCanvasLock} variant="primary" size="sm">
                    Lock Nodes
                </Button>
                <Button onClick={this.openModal} variant="primary" size="sm">
                    Open Canvas
                </Button>
                <div className={classes.Container}>
                    <SideBar format={this.canvasManager.getCanvasName()} categories={CATEGORIES}/>
                    <Canvas engine={this.canvasManager.getEngine()} onDropCanvas={this.canvasManager.onDropCanvas}/>
                </div>

                <BottomNav unsatNodeAssertions={this.state.unsatNodeAssertions}
                           allNodeAssertions={this.state.allNodeAssertions}
                           allLinkAssertions={this.state.allLinkAssertions}
                           log={this.state.log}
                />
            </div>
        );
    }

}


export default App;
