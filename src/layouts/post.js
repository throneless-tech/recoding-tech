import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
import _ from "lodash";
import { titleCase } from "title-case";
import { convert } from "html-to-text";

// utils
import { markdownify, htmlToReact, urlFor } from "../utils";

// material ui imports
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// components
import { Layout } from "../components/index";
import RelatedCommentary from "../components/RelatedCommentary";
import RelatedTopics from "../components/RelatedTopics";
import SectionSubscribe from "../components/SectionSubscribe";

// icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
}

function format(crumb) {
  return titleCase(crumb.split("-").join(" "));
}

const Post = (props) => {
  const router = useRouter();
  const { page } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (router) {
      setBreadcrumbs(router.query.slug);
    }
  }, [router]);

  useEffect(() => {}, [breadcrumbs]);

  return (
    <Layout {...props}>
      <Box my={6}>
        <Container>
          <Box
            role="presentation"
            onClick={handleClick}
            sx={{ marginBottom: 6 }}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Typography variant="body2" color="text.primary">
                Home
              </Typography>
              {breadcrumbs && breadcrumbs.length
                ? breadcrumbs.map((crumb, index) => {
                    if (index == breadcrumbs.length - 1) {
                      return (
                        <Typography key={crumb} variant="body2" color="#FF0033">
                          {format(crumb)}
                        </Typography>
                      );
                    } else {
                      return (
                        <Typography key={crumb} variant="body2" color="#FFF">
                          {format(crumb)}
                        </Typography>
                      );
                    }
                  })
                : null}
            </Breadcrumbs>
          </Box>
          <Grid container spacing={8}>
            <Grid container spacing={4} item xs={12} md={8} direction="row">
              <Grid item>
                {/* <Typography component="div" className="html-to-react">
                  {markdownify(_.get(props, "page.content", null))}
                </Typography> */}
                <Typography
                  component="h1"
                  variant="h2_article"
                  sx={{ borderBottom: "1px solid #8AA29D", paddingBottom: 2 }}
                >
                  {page.title}
                </Typography>
                {page.authors.length &&
                  page.authors.map((auth, index) => (
                    <Typography
                      key={auth.slug.current}
                      component="span"
                      variant="body2"
                      sx={{
                        color: "#616161",
                        fontSize: 12,
                        textTransform: "uppercase",
                      }}
                    >
                      {index == page.authors.length - 1
                        ? `${auth.name} / `
                        : `${auth.name}, `}
                    </Typography>
                  ))}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: "#616161",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {DateTime.fromISO(page.date).toLocaleString(
                    DateTime.DATE_MED
                  )}
                </Typography>
                {page.toc && (
                  <Grid item xs={12} sm={12} mt={2}>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#F3F0E699",
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h4"
                        sx={{
                          borderBottom: "1px solid #8AA29D",
                          marginBottom: 2,
                          paddingBottom: 2,
                        }}
                      >
                        Table of Contents
                      </Typography>
                      <Typography component="div" className="html-to-react">
                        {markdownify(_.get(props, "page.toc", null))}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {page.body && (
                  <Typography component="div" className="html-to-react-article">
                    {htmlToReact(page.body)}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box marginBottom={6}>
                <Typography
                  component="h2"
                  variant="h4"
                  sx={{
                    borderBottom: "1px solid #8AA29D",
                    paddingBottom: 2,
                    width: "100%",
                  }}
                >
                  Authors
                </Typography>
                <Stack direction="column" spacing={4}>
                  {page.authors.map((auth) => (
                    <Grid
                      container
                      key={auth.slug.current}
                      spacing={2}
                      item
                      xs={12}
                    >
                      <Grid item xs={auth.photo ? 3 : 0}>
                        {auth.photo && (
                          <Image
                            src={urlFor(auth.photo.url).width(80).url()}
                            height={80}
                            width={80}
                            alt=""
                            style={{ borderRadius: 50 }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={auth.photo ? 9 : 12}>
                        <Link
                          href={`/author/${auth.slug.current}`}
                          sx={{
                            textDecoration: "none",
                            "&:active, &:focus, &:hover": {
                              color: "#000",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          <Typography
                            component="span"
                            variant="h4"
                            sx={{ color: "#000", fontWeight: 400 }}
                          >
                            {auth.name}
                          </Typography>
                        </Link>
                        {auth.bio && (
                          <Typography
                            color="rgba(0,0,0,0.48)"
                            component="div"
                            variant="body2"
                          >
                            {convert(auth.bio).substring(0, 300)}...
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Stack>
              </Box>
              <RelatedCommentary
                title="Further Reading"
                commentary={page.relatedCommentary}
                noFilter={true}
              />
              <RelatedTopics topics={page.relatedTopics} />
              <SectionSubscribe />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  page: PropTypes.object,
};

export default Post;