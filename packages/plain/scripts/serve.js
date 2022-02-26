import esbuild from "esbuild";

const host = "127.0.0.1";
const port = 3000;
const servedir = "public";
const jsdir = `${servedir}/js`;

esbuild.serve(
  {
    host,
    port,
    servedir,
  },
  {
    entryPoints: ["src/index.ts"],
    outdir: jsdir,
    bundle: true,
  }
);

console.log(`Serving ${servedir} at ${host}:${port}...`);
