import FrameController from "../classes/FrameController";
import InterfaceController from "../classes/InterfaceController";
import { stage } from "../stage";

export function initFrameEventHandler() {
  const frame = FrameController.getInstance();
  const int = InterfaceController.getInstance();

  frame.getFrames().forEach((f) => {
    int.appendFrame(f.framelement);
    const radio = f.framelement.querySelector('input[type=radio]');

    if(!(radio instanceof HTMLInputElement)) return;

    radio.addEventListener("change", () => {
      if(!radio.checked) {
        return;
      }

      stage.removeChildren();
      const frameId = parseInt(radio.id);
      const beforeSelected = frame.getFrameById(frameId - 1);

      if(beforeSelected) {
        beforeSelected.konvaLayer.opacity(0.5);
        stage.add(beforeSelected.konvaLayer)
      }

      frame.selected = parseInt(radio.id);
      const selectedLayer = frame.selected.konvaLayer;
      selectedLayer.opacity(1);
      stage.add(selectedLayer);
    })
  });
}