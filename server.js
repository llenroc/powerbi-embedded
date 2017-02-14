
// ref
const config = require("config");
const powerbi = require("powerbi-api");
const express = require("express");
const njwt = require("njwt");

// create express
const app = express();

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// host client files
app.use(express.static("client"));

// redirect to index page
app.get("/", function(req, res) {
    res.redirect("/index.htm");
});

// return the report configuration
app.get("/report", function(req, res) {
    const id = req.query.id || 1;
    const user = req.query.user;

    // init
    const collection = "CarColorSample";
    const workspaceId = config.get("workspaceId");
    const reportId = config.get("reportId-" + id);
    const accessKey = config.get("accessKey");

    // generate access token
    const _ = undefined;
    const token = powerbi.PowerBIToken.createReportEmbedToken(collection, workspaceId, reportId, _, _, user);
    const jwt = token.generate(accessKey);

    // generate response
    const response = {
        type: "report",
        accessToken: jwt,
        id: reportId,
        embedUrl: "https://embedded.powerbi.com/appTokenReportEmbed"
    };

    // show nJwt
    console.log(jwt);
    njwt.verify(jwt, accessKey, function(err, verified) {
        if (!err) {
            console.log(verified);
            console.log("now: " + Date.now());
        } else {
            console.log("err on verification: " + err);
        }
    });
    
    res.send(response);
});

// listen
app.listen(8080, function () {
    console.log("listening on port 8080...");
});
