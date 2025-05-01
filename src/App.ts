import FrameController from "./classes/FrameController";
import InterfaceController from "./classes/InterfaceController";
import { stage } from "./stage";
import {
  handleAction,
  handleActionEnd,
  handleActionStart,
} from "./handlers/stageHandlers";
import { initFrameEventHandler } from "./helpers/initFrameEventHandler";
import { AnimationController } from "./classes/AnimationController";

export default function App(): void {
  const frame = FrameController.getInstance();
  const int = InterfaceController.getInstance();
  let frameRate = int.getFrameRate();
  let animation = new AnimationController(frameRate);


  int.frameRate.addEventListener("change", function () {
    frameRate = parseInt(int.frameRate.value);
    animation = new AnimationController(frameRate);
    console.log(frameRate, animation);
  });

  int.appendFrame(frame.selected.framelement);

  stage.add(frame.selected.konvaLayer);
  stage.on("mousedown touchstart", handleActionStart);

  stage.on("mouseup touchend", handleActionEnd);

  // and core function - drawing
  stage.on("mousemove touchmove", handleAction);

  int.playButton.addEventListener("change", function () {
    if(this.checked) {
      animation.start();
    } else {
      animation.stop();
    }
  });

  int.addframe.addEventListener("click", () => {
    frame.addFrame();

    initFrameEventHandler();
  });

  initFrameEventHandler();
}
