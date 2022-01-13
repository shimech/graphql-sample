import type { NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { GetUsersDocument } from "~/graphql/dist/generated-client";
import Link from "next/link";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const Users: React.VoidFunctionComponent = () => {
  const { loading, error, data } = useQuery(GetUsersDocument);

  if (loading) {
    return <>Loading...</>;
  }

  if (error || !data) {
    console.error(error);
    return <>{error?.message}</>;
  }

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>
          <Link href={`/users/${user.id}`}>
            <a>{user.name}</a>
          </Link>
        </li>
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
