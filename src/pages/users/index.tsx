import type { NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { GetUsersNameDocument } from "~/graphql/dist/generated-client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

const Users: React.VoidFunctionComponent = () => {
  const { loading, error, data } = useQuery(GetUsersNameDocument);

  if (loading) {
    return <>Loading...</>;
  }

  if (error || !data) {
    return <>Error</>;
  }

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

const Page: NextPage = () => (
  <ApolloProvider client={client}>
    <Users />
  </ApolloProvider>
);

export default Page;
