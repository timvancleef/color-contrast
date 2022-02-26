import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    format: "esm",
    target: ["chrome58", "firefox57", "safari11", "edge16"],
    outfile: "build/index.js",
  })
  .catch(() => process.exit(1));
