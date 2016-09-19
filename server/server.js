
// ref
var config = require("config");
var powerbi = require("powerbi-api");
var express = require("express");
var app = express();

// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// return the report configuration
app.get("/report", function (req, res) {

    // init
    var collection = "CarColorSample";
    var workspaceId = "755358a1-b417-4f84-a3e1-1cd38662215a";
    var reportId = "1a79ea0a-eff3-41c7-a405-880aa6aa0b69";
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

    console.log(response);
    res.send(response);
});

// listen
app.listen(8080, function () {
    console.log("listening on port 8080...");
});
