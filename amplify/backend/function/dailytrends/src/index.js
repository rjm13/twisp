/* Amplify Params - DO NOT EDIT
	API_TWISP_GRAPHQLAPIENDPOINTOUTPUT
	API_TWISP_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const https = require("https")
const{FINISHEDSTORY_TABLE, USER_TABLE} = process.env;
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    //get all of the pending stories in the app
    const storyparams = {
        TableName : FINISHEDSTORY_TABLE,
        IndexName: 'finishedStoriesByDate',
        Limit: 10,
        ScanIndexForward: false,
        FilterExpression : 'Type = :this_type',
        ExpressionAttributes : {':this_type' : 'FinishedStory'}
    };

    //const users = await docClient.scan(userparams).promise();

    let stories;
    let scanStories = [];

    do{
        stories = await docClient.scan(storyparams).promise();
        stories.Items.forEach((item) => (
            scanStories.push(item.id))
        )
        
        storyparams.ExclusiveStartKey  = stories.LastEvaluatedKey;
    } while(typeof stories.LastEvaluatedKey !== "undefined");



    await Promise.all(
        // scanStories.map(
        // (story) => story?.id &&
        // sendTrendingStories({storyID: story.id}))
        )

    //filter roles.activeShifts by createdAt and status === open, in the last week

    //from that, find all of the shifts that were posted in the last week
    //count the number of the those shifts
    //if greater than 0, send push notification to every user in that role

    return "Finished";
};

async function sendTrendingStories(storyID) {
    const stories = {
        
    };
}
