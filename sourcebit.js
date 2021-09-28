const _ = require("lodash");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  plugins: [
    {
      module: require("sourcebit-source-sanity"),
      options: {
        accessToken: process.env.SANITY_ACCESS_TOKEN,
        projectId: process.env.SANITY_PROJECT_ID || "3tzzh18d",
        dataset: process.env.SANITY_DATASET || "production",
        isPreview: isDev,
        watch: isDev,
        richTextOutputFormat: "none"
      }
    },
    {
      module: require("sourcebit-target-next"),
      options: {
        liveUpdate: isDev,
        flattenAssetUrls: true,
        pages: [
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "advanced")
          },
          {
            path: "/articles/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "article")
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "page")
          },
          {
            path: "/policies/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "policyAction")
          },
          {
            path: "/{stackbit_url_path}",
            predicate: _.matchesProperty("__metadata.modelName", "post")
          },
          {
            path: "/guides/{slug}",
            predicate: _.matchesProperty("__metadata.modelName", "guide")
          }
        ],
        commonProps: items => {
          return {
            pages: _.filter(items, item =>
              [
                "advanced",
                "article",
                "page",
                "policyAction",
                "post",
                "guide"
              ].includes(_.get(item, "__metadata.modelName"))
            ),
            citations: items.filter(item =>
              ["citation"].includes(_.get(item, "__metadata.modelName"))
            ),
            topics: items.filter(item =>
              ["topic"].includes(_.get(item, "__metadata.modelName"))
            ),
            data: {
              config: _.find(
                items,
                _.matchesProperty("__metadata.modelName", "config")
              )
            }
          };
        }
      }
    }
  ]
};
