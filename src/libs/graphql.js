import ApolloClient from "apollo-client";
import { HttpLink, InMemoryCache } from "apollo-client-preset";
import { setContext } from "apollo-link-context";

const customFetch = (uri, options) => {
  return fetch(uri, options).then((response) => {
    if (response.status >= 500) {
      // or handle 400 errors
      return Promise.reject(response.status);
    }
    return response;
  });
};

// const APOLLO_URL = "http://localhost:4000/graphql";
// const WS_URL = "ws://localhost:4000/";

// const APOLLO_URL = "http://wave-prod.us-east-1.elasticbeanstalk.com/graphql";
// const APOLLO_URL = "http://54.166.122.249:4000/graphql";
const APOLLO_URL = "http://54.166.122.249:4000/graphql";
const WS_URL = "ws://wave-prod.us-east-1.elasticbeanstalk.com/";

const makeApolloClient = (token) => {
  console.log('tokennnnnnn',token);
  const httpLink = new HttpLink({
    uri: APOLLO_URL,
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    fetch: customFetch,
  });

  const authLink = setContext(async (req, { headers }) => {
    return {
      ...headers,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const updatedHttpLink = authLink.concat(httpLink);

  // const wsLink = new WebSocketLink({
  //   uri: WS_URL,
  //   options: {
  //     reconnect: true,
  //   },
  // });

  // const link = split(
  //   ({ query }) => {
  //     const definition = getMainDefinition(query);
  //     return (
  //       definition.kind === "OperationDefinition" &&
  //       definition.operation === "subscription"
  //     );
  //   },
  //   wsLink,
  //   updatedHttpLink
  //   // httpLink
  // );

  const client = new ApolloClient({
    // link,
    link: updatedHttpLink,
    cache: new InMemoryCache().restore({}),
  });

  return client;
};

export default makeApolloClient;
