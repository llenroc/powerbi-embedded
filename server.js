
// ref
const config = require("config");
const powerbi = require("powerbi-api");
const express = require("express");

const njwt = require("nJwt");

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

    // init
    var collection = "CarColorSample";
    var workspaceId = "755358a1-b417-4f84-a3e1-1cd38662215a";
    var reportId = "f0da1e29-4eca-467f-9204-135f9cffc963";
    var accessKey = config.get("accessKey");

    // generate access token
    var token = powerbi.PowerBIToken.createReportEmbedToken(collection, workspaceId, reportId);
    var jwt = token.generate(accessKey);

    // generate response
    var response = {
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
