import shortid from "shortid";

export function generateId(name) {
  return `${name}_${shortid.generate()}`;
}
