// base imports
import React from "react";

// material ui imports
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

// material ui icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// component imports
import Logo from "./Logo";

const useStyles = makeStyles(theme => ({
  em: {
    fontStyle: "italic"
  },
  header: {},
  mobileNav: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  nav: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

function Header(props) {
  const classes = useStyles();
  const { pages } = props;
  const issues = pages.filter(page => page.layout == "issue");
  const policies = pages.filter(page => page.layout == "policy");
  const countries = pages.filter(page => page.layout == "country");
  const companies = pages.filter(page => page.layout == "company");

  const [issueEl, setIssueEl] = React.useState(null);
  const openIssue = Boolean(issueEl);
  const handleClickIssue = event => {
    setIssueEl(event.currentTarget);
  };
  const handleCloseIssue = () => {
    setIssueEl(null);
  };

  const [policyEl, setPolicyEl] = React.useState(null);
  const openPolicy = Boolean(policyEl);
  const handleClickPolicy = event => {
    setPolicyEl(event.currentTarget);
  };
  const handleClosePolicy = () => {
    setPolicyEl(null);
  };

  const [countryEl, setCountryEl] = React.useState(null);
  const openCountry = Boolean(countryEl);
  const handleClickCountry = event => {
    setCountryEl(event.currentTarget);
  };
  const handleCloseCountry = () => {
    setCountryEl(null);
  };

  const [companyEl, setCompanyEl] = React.useState(null);
  const openCompany = Boolean(companyEl);
  const handleClickCompany = event => {
    setCompanyEl(event.currentTarget);
  };
  const handleCloseCompany = () => {
    setCompanyEl(null);
  };

  return (
    <header className={classes.header} style={{ backgroundColor: "#c2cecc" }}>
      <Box p={4}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Logo />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={8}
            className={classes.nav}
            alignItems="center"
            spacing={4}
            justifyContent="flex-end"
          >
            <Grid item xs={12} sm={3}>
              <Typography id="menu-toggle" className={classes.em}>
                Explore by...
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={9}
              spacing={2}
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  id="policy-button"
                  aria-controls="policy-menu"
                  aria-haspopup="true"
                  aria-expanded={openIssue ? "true" : undefined}
                  onClick={handleClickIssue}
                >
                  Issue
                  {openIssue ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="policy-menu"
                  anchorEl={issueEl}
                  open={openIssue}
                  onClose={handleCloseIssue}
                  MenuListProps={{
                    "aria-labelledby": "policy-button"
                  }}
                >
                  {issues.length
                    ? issues.map(issue => (
                        <MenuItem key={issue.id} onClick={handleCloseIssue}>
                          {issue.title}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="issue-button"
                  aria-controls="issue-menu"
                  aria-haspopup="true"
                  aria-expanded={openPolicy ? "true" : undefined}
                  onClick={handleClickPolicy}
                >
                  Policy
                  {openPolicy ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="issue-menu"
                  anchorEl={policyEl}
                  open={openPolicy}
                  onClose={handleClosePolicy}
                  MenuListProps={{
                    "aria-labelledby": "policy-button"
                  }}
                >
                  {policies.length
                    ? policies.map(policy => (
                        <MenuItem key={policy.id} onClick={handleClosePolicy}>
                          {policy.title}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="country-button"
                  aria-controls="country-menu"
                  aria-haspopup="true"
                  aria-expanded={openCountry ? "true" : undefined}
                  onClick={handleClickCountry}
                >
                  Country
                  {openCountry ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="country-menu"
                  anchorEl={countryEl}
                  open={openCountry}
                  onClose={handleCloseCountry}
                  MenuListProps={{
                    "aria-labelledby": "country-button"
                  }}
                >
                  {countries.length
                    ? countries.map(country => (
                        <MenuItem key={country.id} onClick={handleCloseCountry}>
                          {country.title}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
              <Grid item>
                <Button
                  id="company-button"
                  aria-controls="company-menu"
                  aria-haspopup="true"
                  aria-expanded={openCompany ? "true" : undefined}
                  onClick={handleClickCompany}
                >
                  Company
                  {openCompany ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Button>
                <Menu
                  id="company-menu"
                  anchorEl={companyEl}
                  open={openCompany}
                  onClose={handleCloseCompany}
                  MenuListProps={{
                    "aria-labelledby": "company-button"
                  }}
                >
                  {companies.length
                    ? companies.map(company => (
                        <MenuItem key={company.id} onClick={handleCloseCompany}>
                          {company.title}
                        </MenuItem>
                      ))
                    : null}
                </Menu>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item className={classes.mobileNav}>
            <Grid item>
              <Typography>Explore by...</Typography>
            </Grid>
            <Grid container item>
              <Grid item>Mobile nav here</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}

export default Header;
