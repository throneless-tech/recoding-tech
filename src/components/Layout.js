// base imports
import React from "react";
import Head from "next/head";
import _ from "lodash";

import { withPrefix, attribute } from "../utils";
import Header from "./Header";
import Footer from "./Footer";
import theme from "../theme.js";

// Material UI imports
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

export default class Body extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>
            {_.get(this.props, "page.seo.title", null)
              ? _.get(this.props, "page.seo.title", null)
              : _.get(this.props, "page.title", null) +
                " | " +
                _.get(this.props, "data.config.title", null)}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />
          <meta name="google" content="notranslate" />
          <meta
            name="description"
            content={_.get(this.props, "page.seo.description", null) || ""}
          />
          {_.get(this.props, "page.seo.robots", null) && (
            <meta
              name="robots"
              content={_.join(_.get(this.props, "page.seo.robots", null), ",")}
            />
          )}
          {_.map(
            _.get(this.props, "page.seo.extra", null),
            (meta, meta_idx) => {
              let key_name = _.get(meta, "keyName", null) || "name";
              return _.get(meta, "relativeUrl", null) ? (
                _.get(this.props, "data.config.domain", null) &&
                  (() => {
                    let domain = _.trim(
                      _.get(this.props, "data.config.domain", null),
                      "/"
                    );
                    let rel_url = withPrefix(_.get(meta, "value", null));
                    let full_url = domain + rel_url;
                    return (
                      <meta
                        key={meta_idx}
                        {...attribute(key_name, _.get(meta, "name", null))}
                        content={full_url}
                      />
                    );
                  })()
              ) : (
                <meta
                  key={meta_idx + ".1"}
                  {...attribute(key_name, _.get(meta, "name", null))}
                  content={_.get(meta, "value", null)}
                />
              );
            }
          )}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap"
            rel="stylesheet"
          />
          {_.get(this.props, "data.config.favicon", null) && (
            <link
              rel="icon"
              href={withPrefix(_.get(this.props, "data.config.favicon", null))}
            />
          )}
        </Head>
        <ThemeProvider theme={theme}>
          <Box style={{ backgroundColor: "#c2cecc" }}>
            <Container>
              <Header {...this.props} />
              <main id="main">{this.props.children}</main>
              <Footer {...this.props} />
            </Container>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}
