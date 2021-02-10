# cloudbuild-slack-notifications
Google cloud build slack notifications


## Before you begin

I assume that you have a Google cloud account and that you have signed in to your account.

[Install and initialize the Cloud SDK](https://cloud.google.com/sdk/docs/).

## Preparing the Slack application

[Create a new Slack app](https://api.slack.com/apps?new_app=1):

1. Choose the app's name and your Slack team. Click *Create*.
2. Click *Incoming Webhooks*.
3. Enable incoming webhooks.
4. Click *Add New Webhook to Workspace*. An authorization page opens.
5. From the drop down menu, select the channel to which you would like notifications sent.
6. Click *Authorize*.
7. A webhook for your Slack application has been created. Copy the webhook and save it for later use.

## Deploying the Cloud Function

`gcloud functions deploy subscribenew
  --trigger-topic cloud-builds
  --env-vars-file=env.yaml or --set-env-vars SLACK_WEBHOOK_URL="https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX"
  --runtime nodejs6/nodejs10`
 
  
