import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Material-ui imports
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";

// Icons
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState();

  const handleSearchRequest = (value) => {
    console.log(value);
    // const url = "/search?" + encodeURI(value);
    // if (router && router.push) {
    //   console.log(router);
    // router.push(url);
    // }
  };

  useEffect(() => {}, [router]);

  return (
    <Paper
      component="form"
      elevation={0}
      square
      sx={{ border: "1px solid #000", borderRadius: "2px", maxWidth: 250 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <IconButton
        type="search"
        aria-label="search"
        sx={{ width: 40 }}
        onClick={handleSearchRequest(value)}
      >
        <SearchIcon />
      </IconButton>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          fontFamily: "h1.fontFamily",
          marginLeft: 1,
          marginTop: 1,
          "&:before": {
            borderBottom: "none",
          },
        }}
        placeholder="Search"
      />
    </Paper>
  );
};

export default SearchBar;