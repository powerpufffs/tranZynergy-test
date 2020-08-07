/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path === `/`) {
    page.matchPath = `/*`;
    createPage(page);
  }

  createPage(page);
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  });
};
