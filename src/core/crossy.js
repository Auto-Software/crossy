import { Element } from "../mod/element.js";
import { Button } from "../mod/button.js";
import { Text } from "../mod/text.js";
import { Template } from "../mod/template.js";
import { Router } from "../mod/router.js";

export const element = (tag = "div") => new Element(tag);
export const button = (label = "") => new Button(label);
export const text = (content = "") => new Text(content);
export const template = (content = "") => new Template(content);
export const router = (path = "/") => new Router(path);

