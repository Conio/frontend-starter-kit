import { JSDOM } from "jsdom";
import * as React from "react";
import * as DOM from "react-dom";
import Main from "./Main";

describe("Main class", () => {
  test("to be defined", () => {
    expect(Main).toBeDefined();
  });

  test("to be a React Component", () => {
    expect(Main.prototype instanceof React.Component).toBeTruthy();
  });

  test("to have a render method", () => {
    expect(Main.prototype.render).toBeDefined();
  });

  describe("to correctly render", () => {
    const dom = new JSDOM("<!doctype html><html><body><div id=\"app\"/></body></html>");
    const root = dom.window.document.getElementById("app");
    const elem = DOM.render(<Main />, root);
    expect(root.innerHTML).toBe("<div>Hello World</div>");
  });
});
