import Konva from "konva";
import { stage } from "../stage";
import { KonvaEventListener } from "konva/lib/Node";
import InterfaceController from "../classes/InterfaceController";
import FrameController from "../classes/FrameController";

const int = InterfaceController.getInstance();
const frame = FrameController.getInstance();
let isPaint = false;
let mode = "brush";
let lastLine: Konva.Line;
let color: string = int.getBrushColor() || "#000000";
let layer: Konva.Layer = frame.selected.konvaLayer;

export const handleActionStart: KonvaEventListener<Konva.Stage, any> = function () {
  isPaint = true;
  const pos = stage.getPointerPosition();
  layer = frame.selected.konvaLayer; // get selected layer

  lastLine = new Konva.Line({
    stroke: color,
    strokeWidth: 5,
    globalCompositeOperation: mode === "brush" ? "source-over" : "destination-out",
    // round cap for smoother lines
    lineCap: "round",
    lineJoin: "round",
    // add point twice, so we have some drawings even on a simple click
    points: [pos!.x, pos!.y, pos!.x, pos!.y],
  });

  layer.add(lastLine); // add line to layer
};

export const handleActionEnd: KonvaEventListener<Konva.Stage, any> = function () {
  isPaint = false;
};

export const handleAction: KonvaEventListener<Konva.Stage, any> = function (event) {
  if (!isPaint) {
    return;
  }

  // prevent scrolling on touch devices
  event.evt.preventDefault();

  const pos = stage.getPointerPosition();
  const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
  lastLine.points(newPoints);
};

int.brushColor.addEventListener("change", () => {
  color = int.getBrushColor();
  document.documentElement.style.setProperty("--brush-color", color);

  if(lastLine instanceof Konva.Line){
    lastLine.stroke(color);
  }
});

int.brushMode.addEventListener("change", () => {
  mode = int.getSelectMode();
})

int.eraseMode.addEventListener("change", () => {
  mode = int.getSelectMode();
});

