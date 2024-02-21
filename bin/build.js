#!/usr/bin/env node

const esbuild = require("esbuild")
const package = require("../package.json")
const year = new Date().getFullYear()
const banner = `/*\n\@ment-labs/focus-trap ${package.version}\nCopyright © ${year} Ment Labs\n*/`

const options = {
  entryPoints: ["src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  banner: { js: banner },
  format: 'esm',
  outfile: "dist/focus-trap.js",
}

esbuild.build(options).catch(() => process.exit(1))
