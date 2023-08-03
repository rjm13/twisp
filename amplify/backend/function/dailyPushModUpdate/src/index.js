/* Amplify Params - DO NOT EDIT
	API_TWISP_GRAPHQLAPIENDPOINTOUTPUT
	API_TWISP_GRAPHQLAPIIDOUTPUT
	AUTH_TWISPE3B15DFF_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const https = require("https")
const{STORY_TABLE, USER_TABLE} = process.env;
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    //get all of the pending stories in the app
    const storyparams = {
        TableName : STORY_TABLE,
        FilterExpression : 'Type = :this_type',
        ExpressionAttributes : {':this_type' : 'PendingStory'}
    };

    //get all of the mod users in the app
    const userparams = {
        TableName : USER_TABLE,
        FilterExpression : 'isMod = :this_ismod',
        ExpressionAttributes : {':this_ismod' : true}
    };

    //get all of the pending comnments in the app
    const commentparams = {
        TableName : COMMENT_TABLE,
        FilterExpression : 'Type = :this_type',
        ExpressionAttributes : {':this_type' : 'PendingComment'}
    };

    //const users = await docClient.scan(userparams).promise();
    let scanResults = [];
    let users;
    let stories;
    let scanStories = [];
    let comments;
    let scanComments = [];

    do{
        comments = await docClient.scan(commentparams).promise();
        comments.Items.forEach((item) => scanComments.push(item));
        commentparams.ExclusiveStartKey  = comments.LastEvaluatedKey;
    } while(typeof comments.LastEvaluatedKey !== "undefined");

    do{
        stories = await docClient.scan(storyparams).promise();
        stories.Items.forEach((item) => scanStories.push(item));
        storyparams.ExclusiveStartKey  = stories.LastEvaluatedKey;
    } while(typeof stories.LastEvaluatedKey !== "undefined");

    do{
        users = await docClient.scan(userparams).promise();
        users.Items.forEach((item) => scanResults.push(item));
        userparams.ExclusiveStartKey  = users.LastEvaluatedKey;
    } while(typeof users.LastEvaluatedKey !== "undefined");

    console.log(scanResults)

    await Promise.all(scanResults.map(
        (user) => user?.Setting4 &&
        sendPushNotification({expoPushToken: user.Setting4, storyCount: scanStories.length, commentCount: scanComments.length})))

    //filter roles.activeShifts by createdAt and status === open, in the last week

    //from that, find all of the shifts that were posted in the last week
    //count the number of the those shifts
    //if greater than 0, send push notification to every user in that role

    return "Finished";
};

async function sendPushNotification(expoPushToken, storyCount, commentCount) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "You have new items to approve",
        body: "You have" + storyCount + 'new stories and' + commentCount + 'comments pending approval',
        data: {someData: "goes here"},
    };

    const options = {
        hostname: "exp.host",
        path: "/--/api/v2/push/send",
        method: "POST",
        port: 443, //replace with 80 for http requests
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let rawData = "";

            res.on("data", (chunk) => {
                rawData += chunk;
            });

            res.on("end", () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(new Error(err));
                }
            });
        });

        req.on("error", (err) => {
            reject(new Error(err));
        });

        req.write(JSON.stringify(message));
        req.end();
    });
}
