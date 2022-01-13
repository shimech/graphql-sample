import React from "react";
import type { NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { GetUserByIdDocument } from "~/graphql/dist/generated-client";
import { useRouter } from "next/router";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

const User: React.VoidFunctionComponent = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { loading, error, data } = useQuery(GetUserByIdDocument, {
    variables: { id },
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (error || !data) {
    console.error(error);
    return <>{error?.message}</>;
  }

  return (
    <ul>
      <li>ID: {data.user?.id}</li>
      <li>Name: {data.user?.name}</li>
    </ul>
  );
};

const Page: NextPage = () => (
  <ApolloProvider client={client}>
    <User />
  </ApolloProvider>
);

export default Page;
