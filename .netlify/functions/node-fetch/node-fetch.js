const fetch = require("node-fetch");

const handler = async function (args) {
  const ID = args.queryStringParameters["id"];
  try {
    const query = `
      query GetWork($workSearch: WorkSearchAttributes!) {
        work(workSearch: $workSearch) {
          id
          title
          subtitle
          mainThemaCode
          mainBisacCode
          supportingResources {
            url
          }
          marketingTexts {
            externalText
          }
          contributions {
            id
            sequenceNumber
            role
            productIds
            contributor {
              id
              __typename
              name
              ... on Person {
                keyNames
                personName
                personNameInverted
              }
              ... on Organisation {
                organisationName
              }
            }
          }
        }
      }
    `;

    const variables = {
      workSearch: { idEq: parseInt(ID) },
    };

    const response = await fetch(process.env.REACT_APP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        authorization: `Token ${process.env.REACT_APP_CONSONANCE_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ work: data.data.work }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
