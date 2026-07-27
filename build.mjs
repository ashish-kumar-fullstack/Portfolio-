import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("style", "dist/style", { recursive: true });
await cp("Font", "dist/Font", { recursive: true });
await cp("src", "dist/src", { recursive: true });

const productionHost =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ashish-kumar-portfolio.vercel.app");
const siteUrl = productionHost.replace(/\/+$/, "");

for (const file of ["index.html", "robots.txt", "sitemap.xml"]) {
  const source = await readFile(file, "utf8");
  await writeFile(`dist/${file}`, source.replaceAll("__SITE_URL__", siteUrl));
}
console.log(`Static portfolio built in dist/ for ${siteUrl}`);
