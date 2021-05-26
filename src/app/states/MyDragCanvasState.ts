import {
    State,
    AbstractDisplacementState,
} from '@projectstorm/react-canvas-core';

export default class MyDragCanvasState extends AbstractDisplacementState {

    private initialCanvasX: number;
    private initialCanvasY: number;

    constructor() {
        super({
            name: 'drag-canvas',
        });
    }

    async activated(prev) {
        super.activated(prev);
        this.engine.getModel().clearSelection();
        await this.engine.repaintCanvas(true);

        // we can block layer rendering because we are only targeting the transforms
        for (const layer of this.engine.getModel().getLayers()) {
            layer.allowRepaint(false);
        }

        this.initialCanvasX = this.engine.getModel().getOffsetX();
        this.initialCanvasY = this.engine.getModel().getOffsetY();
    }

    deactivated(next: State) {
        super.deactivated(next);
        for (const layer of this.engine.getModel().getLayers()) {
            layer.allowRepaint(true);
        }
    }

    fireMouseMoved(event) {
        // (!!) This is my proposed change
        if (this.engine.getModel().isLocked()) return;

        this.engine
            .getModel()
            .setOffset(
                this.initialCanvasX + event.displacementX,
                this.initialCanvasY + event.displacementY,
            );
        this.engine.repaintCanvas();
    }
}
