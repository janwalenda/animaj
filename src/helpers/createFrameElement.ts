export default function createFrameElement(id: number): HTMLLabelElement {
  const wrapper = document.createElement("label");
  const figure = document.createElement("figure");
  const input = document.createElement("input");
  const div = document.createElement("div");

  figure.id = `frame-${id}`;
  input.type = "radio";
  input.name = "select";
  input.id = id.toString(10);

  if(id === 0) {
    input.checked = true;
  }

  if (!(input instanceof HTMLInputElement)) {
    throw new Error("input is not an instance of HTMLInputElement");
  }

  const figcaption = document.createElement("figcaption");

  figcaption.textContent = id.toString(10);

  figure.appendChild(figcaption);
  figure.appendChild(div);
  figure.appendChild(input);
  wrapper.appendChild(figure);
  wrapper.classList.add("frame");

  return wrapper;
}