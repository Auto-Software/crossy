#!/usr/bin/env node

import { exec } from "child_process";

const cmd = process.argv[2];

if (cmd === "dev") {
    console.log("crossy is running...");
    exec("npx vite", { stdio: "inherit" });
} else {
    console.log("unknow command!");
    console.log("use: crossy dev");
}

