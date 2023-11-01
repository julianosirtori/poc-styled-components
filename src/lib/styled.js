import { createElement } from "react";
import { compile, serialize, stringify } from "stylis";
import { phash, hash } from "../utils/hash";
import generateAlphabeticName from "../utils/generateAlphabeticName";

const domElements = ["button", "div", "a"];

function makeStyleTag() {
  let styleTag = document.querySelector("#styled-components");
  if (!styleTag) {
    const head = document.head;
    styleTag = document.createElement("style");
    styleTag.setAttribute("type", "text/css");
    styleTag.setAttribute("id", "styled-components");
    head.appendChild(styleTag);
  }
  return styleTag;
}

function createClassName(domElement) {
  return generateAlphabeticName(phash(hash(1234), domElement));
}

function injectStyle(className, styles) {
  const styleTag = makeStyleTag();
  const rule = serialize(compile(`.${className}{${styles}}`), stringify);
  const node = document.createTextNode(rule);
  styleTag.appendChild(node);
}

const styledBase = (domElement) => (styles) => {
  const className = createClassName(domElement);
  injectStyle(className, styles);

  const Element = (teste) => {
    return createElement(domElement, { className }, teste.children);
  };
  Element.displayName = "Teste";
  return Element;
};

export const styled = styledBase;

domElements.forEach((dom) => {
  styled[dom] = styledBase(dom);
});

