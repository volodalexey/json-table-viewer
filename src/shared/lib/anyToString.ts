const SEPARATOR = ", ";
export function anyToString(any: unknown, skipArgs = false): string {
  if (Array.isArray(any)) {
    if (skipArgs) {
      if (any.length) {
        return any.map((a) => anyToString(a)).join(SEPARATOR);
      }
      return "";
    }
    return `[ ${any.map((a) => anyToString(a)).join(SEPARATOR)} ]`;
  }
  if (any === true) {
    return "true";
  } else if (any === false) {
    return "false";
  } else if (any === null) {
    return "null";
  } else if (
    typeof any == "object" &&
    ["[object Object]", "[object DOMRect]"].includes(String(any))
  ) {
    const res = [];
    for (const e in any) {
      res.push(`${e}: ${anyToString((any as Record<string, unknown>)[e])}`);
    }
    return `{ ${res.join(SEPARATOR)} }`;
  }
  if (any instanceof HTMLElement || any instanceof SVGElement) {
    const matched = any.constructor.toString().match(/function (\w+)/); // e.g. ƒ HTMLDivElement() { [native code] }
    const name =
      Array.isArray(matched) && matched[1] !== "HTMLElement"
        ? matched[1]
        : any.tagName;
    return `${[
      name,
      any.id ? `#${any.id}` : false,
      (any as HTMLAnchorElement).href
        ? `=${(any as HTMLAnchorElement).href}`
        : false,
    ]
      .filter(Boolean)
      .join(SEPARATOR)}`;
  }
  return any ? String(any) : "";
}
