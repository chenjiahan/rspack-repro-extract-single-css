import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  output: {
    distPath: {
      root: "./rsbuild-dist",
    },
  },
  source: {
    entry: {
      main: "./src/main",
      b: "./src/b",
    },
  },
  performance: {
    chunkSplit: {
      override: {
        cacheGroups: {
          styles: {
            name: "styles",
            minSize: 0,
            test: /\.css$/,
            chunks: "all",
            priority: 99,
          },
        },
      },
    },
  },
});
