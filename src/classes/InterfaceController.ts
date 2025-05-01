type Controls = {
  frameRate: HTMLInputElement;
  brushColor: HTMLInputElement;
  playButton: HTMLInputElement;
  framesWrapper: HTMLDivElement;
  addframe: HTMLButtonElement;
  playText: HTMLSpanElement;
  brushMode: HTMLInputElement;
  eraseMode: HTMLInputElement;
};

let instance: InterfaceController;

export default class InterfaceController {
  private controls: Controls;

  static getInstance(): InterfaceController {
    if(!instance) {
      instance = new InterfaceController();
    }

    return instance;
  }

  constructor() {
    this.controls = {
      frameRate: document.getElementById("framerate") as HTMLInputElement,
      brushColor: document.getElementById("brushcolor") as HTMLInputElement,
      playButton: document.getElementById("play_check") as HTMLInputElement,
      framesWrapper: document.getElementById("frames") as HTMLDivElement,
      addframe: document.getElementById("addframe") as HTMLButtonElement,
      playText: document.getElementById("play_text") as HTMLSpanElement,
      brushMode: document.getElementById("brush") as HTMLInputElement,
      eraseMode: document.getElementById("erase") as HTMLInputElement,
    };
  }

  get brushMode(): HTMLInputElement {
    return this.controls.brushMode;
  }

  get eraseMode(): HTMLInputElement {
    return this.controls.eraseMode;
  }

  get frameRate(): HTMLInputElement {
    return this.controls.frameRate;
  }

  get brushColor(): HTMLInputElement {
    return this.controls.brushColor;
  }

  get playButton(): HTMLInputElement {
    return this.controls.playButton;
  }

  get framesWrapper(): HTMLDivElement {
    return this.controls.framesWrapper;
  }

  get addframe(): HTMLButtonElement {
    return this.controls.addframe;
  }

  get playText(): HTMLSpanElement {
    return this.controls.playText;
  }

  setPlayText(text: string): void {
    this.controls.playText.textContent = text;
  }

  getSelectMode(): string {
    if(this.brushMode.checked) {
      return "brush";
    } else if(this.eraseMode.checked) {
      return "erase";
    }
    return "brush";
  }
  getFrameRate(): number {
    return parseInt(this.controls.frameRate.value);
  }
  getBrushColor(): string {
    return this.controls.brushColor.value;
  }

  isPlayButtonChecked(): boolean {
    return this.controls.playButton.checked;
  }

  appendFrame(frame: HTMLElement): void {
    this.framesWrapper.appendChild(frame);
  }
}