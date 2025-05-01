import FrameController from "./FrameController";
import { stage } from "../stage";

export class AnimationController {
  private animationFrame: number | null = null;
  private fps: number = 25;
  private lastTimestamp: number = 0; // Store the last timestamp for calculating delta time
  private count = 0;

  constructor(fps: number) {
    this.fps = fps;
  }

  private handleAnimation() {
    const frame = FrameController.getInstance();
    const nowFrame = frame.getFrameById(this.count);

    if (this.count >= frame.countFrames() || !nowFrame) {
      this.stop();
      this.count = 0;
      return;
    }

    stage.removeChildren();
    nowFrame.konvaLayer.opacity(1);
    stage.add(nowFrame.konvaLayer);
    this.count++;
  }

  start() {
    this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    if (!this.animationFrame) {
      return;
    }

    window.cancelAnimationFrame(this.animationFrame);
  }

  animate(timestamp: number) {
    console.log(timestamp);
    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Calculate delta time in seconds
    const interval = 1 / this.fps;

    if (deltaTime >= interval) {
      this.handleAnimation(); // Pass delta time to the callback
      this.lastTimestamp = timestamp; // Update the last timestamp only when we call the callback
    }

    this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }
}
