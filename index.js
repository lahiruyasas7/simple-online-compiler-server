const express = require("express");
const cors = require("cors");
const Axios = require("axios");
require('dotenv').config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

    if (language === "python") {
      language = "python3";
    }

  let data = {
    code: code,
    language: language,
    input: input,
    version: "latest",
  };

  //   let config = {
  //     method: "post",
  //     url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
  //     headers: {
  //       "content-type": "application/json",
  //       "X-RapidAPI-Key": "f46cc3fa12msh8cf77c3c70f5710p17cb8ejsn0ba4c970d300",
  //       "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
  //     },
  //     data: data,
  //   };

  let config = {
    method: "post",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: data,
  };

  //calling the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/", (req, res) => {
  res.send("Code Compiler!");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
