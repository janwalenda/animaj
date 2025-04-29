import { SelectableElement } from "../types/SelectableElement";

export function documentSelect(options: SelectableElement): HTMLElement | null {
  if (options.id) {
    return document.getElementById(options.id);
  } else if (options.query) {
    return document.querySelector(options.query);
  }
  return null;
}
