# Power BI Embedded Sample

## Sample

You will need to complete the following steps to work with this sample:

1. Create a Power BI Workspace Collection in an Azure subscription
2. Install the Power BI CLI tool: https://github.com/Microsoft/PowerBI-Cli
3. Use the CLI tool to create a workspace
4. Create a new report in Power BI Desktop an save as a PBIX file
5. Use the CLI tool to upload the PBIX file
6. Use the CLI tool to update the database connection parameters (-u -p should be all that is needed)
7. Create a config/default.json file and input the correct workspaceId, reportId, and accessKey
8. Start the server.js file in Node.js
9. Go to http://localhost:8080

## Billing

The billing documentation specifies that it is $0.05 per user session per month, but this opens up a few questions. The below is from testing using this project, not a definitive answer from the Power BI team.

* How is a user determined? The username property in the access token is optional and is just an arbitrary string.

The user property in the access token is irrelevant for billing. The only thing that appears to matter is the browser session (a new browser session is an additional Power BI Embedded session).

* If a new access token is generated for the same "user" does that charge as a new session?

It doesn't appear to matter whether the access token is new or not, it still only seems to bill as a single session when it is from the same browser session.

* If the user checks multiple different reports does that bill as separate sessions?

No, I tested separate reports under the same collection and workspace and it did not bill as separate sessions.

* Is there any way using the PowerBI API to get the # of sessions? Or is the only way in the Azure portal?

So far I have only been able to find this in the Azure portal. It seems to update after several minutes.
