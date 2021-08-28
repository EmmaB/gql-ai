# Advance info sheet demo app

This is a small demo to provide a working example of using Consonance GraphQL as a data source to automate the publishing task of generating advance information sheets.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## CORS access

If CORS access provides an insurmountable hurdle to your using GraphQL, please contact us on support@consonance.app as we may decide to whitelist client apps.

In this demo app, we have used a Netlify function to accommodate CORS. This is a good article to get the gist of what we're doing here. https://www.digitalocean.com/community/tutorials/nodejs-solve-cors-once-and-for-all-netlify-dev


## Installation

Clone this repo. Run `yarn` to build your node modules.

Use Netlify's free tier to run in development and also deploy to the internet. You will need an account and a Netlify project. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/) and follow their instructions to get set up.

```
npm i -g netlify-cli

$ netlify init # or `ntl init`
```

Start a local proxy server:

```
$ netlify dev # or `ntl dev`
```

You can even share a live development server: see the [Netlify docs](https://docs.netlify.com/cli/get-started/#share-a-live-development-server) for more detail.
```
netlify dev --live
```

You should see the proxy server run on `localhost:8888`.

## Keys

You'll need to add a .env file at the root of the project and add in your Consonance keys. Use these names, and replace the long string with your real Consonance key.

```
REACT_APP_CONSONANCE_KEY=asdfghjkijuhygtfdcfvghjklkjhgfvcvb
REACT_APP_URL=https://web.consonance.app/graphql
```

## Deployment

Locally, run:

```
yarn run build
```

Then:

```
netlify deploy --prod
```
