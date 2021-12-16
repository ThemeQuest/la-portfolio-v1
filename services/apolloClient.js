import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  uri: 'https://api-us-east-1.graphcms.com/v2/ckvcb4zl80vtp01z07rwjg9cm/master', // Your Content API here
});

export default client;