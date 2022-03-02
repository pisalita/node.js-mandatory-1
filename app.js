const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const fs = require("fs");

// SSR start - Getting and assembling the components and pages on server startup

// Components
const nav = fs.readFileSync("./public/components/nav.html").toString();
const footer = fs.readFileSync("./public/components/footer.html").toString();

// Pages
const javascriptMastery = fs
  .readFileSync("./public/pages/javascriptMastery.html")
  .toString();

const nodeJs = fs.readFileSync("./public/pages/nodeJs.html").toString();

const restApi = fs.readFileSync("./public/pages/restApi.html").toString();

const Ssr = fs.readFileSync("./public/pages/Ssr.html").toString();

const terminalCommands = fs
  .readFileSync("./public/pages/terminalCommands.html")
  .toString();

// Assemble pages
const javascriptMasteryPage =
  nav
    .replace("%%DOCUMENT_TITLE%%", "javascriptMastery")
    .replace("%%JAVASCRIPTMASTERY_ACTIVE%%", "active") +
  javascriptMastery +
  footer;

const nodeJsPage =
  nav
    .replace("%%DOCUMENT_TITLE%%", "Node.js")
    .replace("%%NODEJS_ACTIVE%%", "active") +
  nodeJs +
  footer;

const restApiPage =
  nav
    .replace("%%DOCUMENT_TITLE%%", "Rest API")
    .replace("%%RESTAPI_ACTIVE%%", "active") +
  restApi +
  footer;

const SsrPage =
  nav.replace("%%DOCUMENT_TITLE%%", "SSR").replace("%%SSR_ACTIVE%%", "active") +
  Ssr +
  footer;

const terminalCommandsPage =
  nav
    .replace("%%DOCUMENT_TITLE%%", "Terminal Commands")
    .replace("%%TERMINALCOMMANDS_ACTIVE%%", "active") +
  terminalCommands +
  footer;

// SSR end

app.get("/", (req, res) => {
  res.send(javascriptMasteryPage);
});

app.get("/terminalCommands", (req, res) => {
  res.send(terminalCommandsPage);
});

app.get("/nodeJs", (req, res) => {
  res.send(nodeJsPage);
});

app.get("/restApi", (req, res) => {
  res.send(restApiPage);
});

app.get("/ssr", (req, res) => {
  res.send(SsrPage);
});

app.listen(port, () => console.log(`Server started on port ${port}`));
