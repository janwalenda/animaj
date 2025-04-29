export class Animation {
  private animationFrame: number | null = null;
  private fps: number = 25;
  private callback: Function | null = null;
  private lastTimestamp: number = 0; // Store the last timestamp for calculating delta time
  constructor(fps: number) {
    this.fps = fps;
    this.callback = null;
  }

  setCallback(callback: Function) {
    this.callback = callback;
  }

  start() {
    this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    if (typeof this.animationFrame !== "number") {
      return;
    }

    window.cancelAnimationFrame(this.animationFrame);
  }

  animate(timestamp: number) {
    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Calculate delta time in seconds
    const interval = 1 / this.fps;

    if (deltaTime >= interval) {
      if (this.callback) {
        this.callback(deltaTime); // Pass delta time to the callback
      }
      this.lastTimestamp = timestamp; // Update the last timestamp only when we call the callback
    }

    this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
  }
}
