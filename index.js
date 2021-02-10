// node6 runtime used

const IncomingWebhook = require('@slack/client').IncomingWebhook;
// You can configure this in cloudfunction or you can directly paste SLACK_WEBHOOK_URL here itself
// SLACK_WEBHOOK_URL will look like below

// const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
// in case you are want to paste SLACK_WEBHOOK_URL here directly you need to commnet below 1 line.

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

// subscribe is the main function called by Cloud Functions.
module.exports.subscribe = (event, callback) => {
 const build = eventToBuild(event.data.data);
 console.log(JSON.stringify(build))

// Skip if the current status is not in the status list.
// Add additional statues to list if you'd like:
// QUEUED, WORKING, SUCCESS, FAILURE,
// INTERNAL_ERROR, TIMEOUT, CANCELLED
  const status = ['SUCCESS', 'FAILURE', 'INTERNAL_ERROR', 'TIMEOUT'];
  if (status.indexOf(build.status) === -1) {
    return callback();
  }

  // Send message to Slack.
  const message = createSlackMessage(build);
  webhook.send(message, callback);
};

// eventToBuild transforms pubsub event message to a build object.
const eventToBuild = (data) => {
  return JSON.parse(new Buffer(data, 'base64').toString());
}

// createSlackMessage create a message from a build object.
const createSlackMessage = (build) => {
  messageColor = (build.status !== 'SUCCESS') ? 'danger' : 'good'; 
  let message = {
    mrkdwn: true,
    attachments: [
      {
        color: messageColor,
        author_name: "Google Cloud Builder",
        author_link: "https://console.cloud.google.com/gcr/triggers?project=mitter-container-registry",
        author_icon: "https://img.stackshare.io/service/6636/container-engine.png",
        title: build.source.repoSource.repoName,
        fields: [{
          title: "Branch",
          value: build.source.repoSource.branchName,
          short: true
        },
        {
          title: "Status",
          value: build.status,
          short: true
        },
        {
          title: "Commit Sha",
          value: build.sourceProvenance.resolvedRepoSource.commitSha
        }]
      }
    ]
  };
  return message
}

