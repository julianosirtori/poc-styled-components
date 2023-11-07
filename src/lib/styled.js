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

function interpolateStyle(strs, props, exprs) {
  return exprs.reduce((result, expr, index) => {
    const isFunc = typeof expr === "function";
    const value = isFunc ? expr(props) : expr;
    return result + value + strs[index + 1];
  }, strs[0]);
}

const styledBase =
  (domElement) =>
  (strs, ...exprs) => {
    const Element = (props) => {
      const styles = interpolateStyle(strs, props, exprs);
      const className = createClassName(domElement);
      injectStyle(className, styles);
      return createElement(domElement, { className }, props.children);
    };
    return Element;
  };

export const styled = styledBase;

domElements.forEach((dom) => {
  styled[dom] = styledBase(dom);
});

