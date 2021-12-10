const withTM = require("next-transpile-modules")(["../contract"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
});
