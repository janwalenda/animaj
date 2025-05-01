import Konva from "konva";
import ViewController from "./classes/ViewController";

const viewCtrl = ViewController.getInstance();

export const stage = new Konva.Stage({
  container: "container",
  width: viewCtrl.width,
  height: viewCtrl.height,
});

viewCtrl.onUpdate((_, width, height) => {
  stage.width(width);
  stage.height(height);
});