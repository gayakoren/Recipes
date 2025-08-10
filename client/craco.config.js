const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
      );

      webpackConfig.resolve.alias["@shared"] = path.resolve(__dirname, "../shared");

      const tsRule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (tsRule) {
        const tsLoader = tsRule.oneOf.find((r) =>
          r.test && r.test.toString().includes("ts")
        );
        if (tsLoader) {
          tsLoader.include = [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "../shared"),
          ];
        }
      }

      return webpackConfig;
    },
  },
};
