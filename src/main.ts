import Konva from "konva";
import { Frame } from "./types/Frame";
import { documentSelect } from "./helpers/documentSelect";
import { Animation } from "./classes/Animation";

// create tool select
const select = documentSelect({ id: "select" });
const play = documentSelect({query: "#play>#play_check"});
const framesWrapper = documentSelect({id:"frames"});
const addFrameButton = documentSelect({id: "addframe"});

const width = window.innerWidth;
const height = window.innerHeight - 25;

// first we need Konva core things: stage and layer
const stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});

const frames: Frame[] = [
  {
    id: 0,
    frame: new Konva.Layer(),
  },
];

let selected = frames[0];

function createFigure(id: number, url: string): HTMLElement {
  const figure = document.createElement("figure");
  const span = document.createElement("span");
  const input = document.createElement("input");

  figure.id = `frame-${id}`;
  input.type = "radio";
  input.name = "select";
  input.id = id.toString(10);

  if (id === 0) {
    input.checked = true;
  }

  if (!(input instanceof HTMLInputElement)) {
    throw new Error("input is not an instance of HTMLInputElement");
  }

  input.onchange = function () {
    if (!input.checked) {
      return;
    }

    stage.removeChildren();
    selected = getFrame(id);

    if (getFrame(id - 1)) {
      const beforeSelected = getFrame(id - 1);
      beforeSelected.frame.opacity(0.5);

      stage.add(beforeSelected.frame);
    }
    stage.add(selected.frame);
  };

  const figcaption = document.createElement("figcaption");

  span.style.setProperty("background-image", `url(${url})`);

  figcaption.textContent = id.toString(10);

  figure.appendChild(figcaption);
  figure.appendChild(span);
  figure.appendChild(input);

  return figure;
}

function addFrame() {
  const id = frames.length;
  frames.push({
    id,
    frame: new Konva.Layer(),
  });

  appendFrames();
}

function getFrame(id: number): Frame {
  return frames.find((frame) => frame.id === id) as Frame;
}

function appendFrames() {
  if (!(addFrameButton instanceof HTMLButtonElement)) {
    return console.error("addFrameButton is not HTMLButtonElement");
  } else if (!(framesWrapper instanceof HTMLDivElement)) {
    return console.error("framesWrapper is not HTMLDivElement");
  }

  const addFrameButtonWrapper = addFrameButton.parentNode;

  if (!(addFrameButtonWrapper instanceof HTMLDivElement)) {
    return console.error("addFrameButtonWrapper is not HTMLDivElement");
  }

  framesWrapper.innerHTML = "";
  framesWrapper.appendChild(addFrameButtonWrapper);

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const url = getFrameURL(frame.frame);
    const wrapper = document.createElement("label");
    const figure = createFigure(frame.id, url);

    wrapper.classList.add("frame");
    wrapper.appendChild(figure);

    framesWrapper.appendChild(wrapper);
  }
}

function getFrameURL(layer: Konva.Layer) {
  const url = layer.toDataURL({ mimeType: "image/png" });
  return url;
}

const animation = new Animation(2);

appendFrames();

if(addFrameButton instanceof HTMLButtonElement) {
  addFrameButton.onclick = addFrame;
}

stage.add(selected.frame);

let isPaint = false;
let mode = "brush";
let lastLine: Konva.Line;

stage.on("mousedown touchstart", function () {
  const frameImg = document.querySelector(`#frame-${selected.id} span`);
  isPaint = true;
  const pos = stage.getPointerPosition();

  lastLine = new Konva.Line({
    stroke: "#df4b26",
    strokeWidth: 5,
    globalCompositeOperation:
      mode === "brush" ? "source-over" : "destination-out",
    // round cap for smoother lines
    lineCap: "round",
    lineJoin: "round",
    // add point twice, so we have some drawings even on a simple click
    points: [pos!.x, pos!.y, pos!.x, pos!.y],
  });
  selected.frame.add(lastLine);
  const url = getFrameURL(selected.frame);

  if (frameImg instanceof HTMLSpanElement) {
    frameImg.style.setProperty("background-image", `url(${url})`);
  }
});

stage.on("mouseup touchend", function () {
  isPaint = false;
});

// and core function - drawing
stage.on("mousemove touchmove", function (event) {
  if (!isPaint) {
    return;
  }

  // prevent scrolling on touch devices
  event.evt.preventDefault();

  const pos = stage.getPointerPosition();
  const newPoints = lastLine.points().concat([pos!.x, pos!.y]);
  lastLine.points(newPoints);
});

if(select instanceof HTMLSelectElement) {
  select.addEventListener("change", function () {
    mode = select.value;
  });
}

if (play instanceof HTMLInputElement) {
  play.addEventListener("change", function (event) {
    const checkbox = event.currentTarget as HTMLInputElement;
    const span = checkbox.previousElementSibling;
    if (checkbox instanceof HTMLInputElement && checkbox.checked) {
      span!.textContent = "Playing";
      let i = 0;
      animation.setCallback(() => {
        if (i < frames.length) {
          stage.removeChildren();
          stage.add(frames[i].frame);
        } else {
          animation.stop();
          checkbox.checked = false;
          span!.textContent = "Play";
        }
        i++;
      });

      animation.start();
    } else {
      animation.stop();
      span!.textContent = "Play";
    }
  });
}

window.addEventListener("resize", () => {
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);
});