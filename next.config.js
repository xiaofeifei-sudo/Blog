module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
const withCss = require("@zeit/next-css");
const withLess = require("@zeit/next-less");

if (typeof require !== "undefined") {
  require.extensions[".css"] = (file) => {};
}

module.exports = withLess(
  withCss({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "primary-color": "#8A2BE2",
        "link-color": "#8A2BE2",
        "border-radius-base": "2px",
      },
    },
  })
);
