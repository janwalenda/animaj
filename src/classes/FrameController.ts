import Konva from "konva";
import createFrameElement from "../helpers/createFrameElement";
import { Frame } from "../types/Frame";

const frames: Frame[] = [];

let selected: Frame;
let instance: FrameController;

export default class FrameController {
  static getInstance(): FrameController {
    if (!instance) {
      instance = new FrameController();
    }
    return instance;
  }

  constructor() {
    const frame = {
      id: 0,
      konvaLayer: new Konva.Layer(),
      framelement: createFrameElement(0),
    };
    frames.push(frame);

    selected = frame;
  }

  getFrames(): Frame[] {
    return frames;
  }

  countFrames(): number {
    return frames.length;
  }

  getFrameById(id: number): Frame | undefined {
    return frames.find((frame) => frame.id === id);
  }

  addFrame(): void {
    frames.push({
      id: frames.length,
      konvaLayer: new Konva.Layer(),
      framelement: createFrameElement(frames.length),
    });
  }

  removeFrame(id: number): void {
    const index = frames.findIndex((f) => f.id === id);
    if (index !== -1) {
      frames.splice(index, 1);
    }
  }
  updateFrame(id: number, frame: Frame): void {
    const index = frames.findIndex((f) => f.id === id);
    if (index !== -1) {
      frames[index] = frame;
    }
  }

  get selected(): Frame {
    return selected;
  }

  set selected(id: number) {
    const frame = this.getFrameById(id);
    selected = frame || selected;
  }

  appendFrames() {}
}
