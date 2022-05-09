const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const orgName = "mach";
  // Get import maps for the environment
  const importMaps = require(`./src/import-maps/import-map.${
    env.map || "local"
  }.json`);

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    env,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: env && env.isLocal,
          importMap: JSON.stringify(importMaps),
          orgName,
        },
      }),
    ],
  });
};
