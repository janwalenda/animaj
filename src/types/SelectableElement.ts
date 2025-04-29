import { RequireOnlyOne } from "./RequireOnlyOne";
import { SelectOptions } from "./SelectOptions";

export type SelectableElement = RequireOnlyOne<SelectOptions, "id" | "query">;
