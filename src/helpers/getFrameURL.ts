import Konva from "konva";

export function getFrameURL(layer: Konva.Layer) {
  const url = layer.toDataURL({ mimeType: "image/png" });
  return url;
}
