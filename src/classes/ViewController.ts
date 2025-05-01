let instance: ViewController;

export default class ViewController {
  static getInstance(): ViewController {
    if (!instance) {
      instance = new ViewController();
    }
    return instance;
  }

  get width(): number {
    return window.innerWidth;
  }
  get height(): number {
    return window.innerHeight;
  }

  public onUpdate(callback: (event: UIEvent, width: number, height: number) => void): void {
    window.addEventListener('resize', (event) => {
      callback(event, this.width, this.height);
    });
  }
}