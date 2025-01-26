import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI({
    adapter: "svelte",
    projectPath: process.cwd(),
  });
}