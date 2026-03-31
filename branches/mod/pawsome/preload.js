const { readFileSync } = require("fs");
const { join } = require("path");
const { webFrame } = require("electron");

require("./pawsome-desktop/pawtopPreload.js");

webFrame.top.executeJavaScript(readFileSync(join(__dirname, "pawsome-desktop/renderer.js"), "utf8"));
