#!/usr/bin/env node

const esbuild = require("esbuild")
const package = require("../package.json")
const banner = `/*\n\@callbacksystems/focus-trap ${package.version}\nCopyright © Callback Systems\n*/`

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  banner: { js: banner },
  format: "esm",
  outfile: "dist/focus-trap.js",
}

esbuild.build(options).catch(() => process.exit(1))
