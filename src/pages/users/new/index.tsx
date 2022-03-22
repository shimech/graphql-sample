import React from "react";
import type { NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  ApolloError,
  useMutation,
  InMemoryCache,
} from "@apollo/client";
import {
  CreateUserDocument,
  CreateUserMutation,
} from "~/graphql/dist/generated-client";
import Link from "next/link";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

type StatusProps = {
  loading: boolean;
  error?: ApolloError;
  data?: CreateUserMutation | null;
};

const Status: React.VoidFunctionComponent<StatusProps> = (props) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  if (props.error) {
    console.error(props.error);
    return <>{props.error.message}</>;
  }

  if (props.data && !props.data.createUser) {
    return <>同名のユーザーがすでに存在します。</>;
  }

  if (!props.data) {
    return null;
  }

  return <>登録が完了しました。</>;
};

const UserCreationForm: React.VoidFunctionComponent = () => {
  const [name, setName] = React.useState("");
  const [createUser, result] = useMutation(CreateUserDocument);

  return (
    <>
      <h1>ユーザ登録</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createUser({ variables: { name } });
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <Link href="/users">
        <a>ユーザー一覧へ</a>
      </Link>
      <div>
        <Status {...result} />
      </div>
    </>
  );
};

const Page: NextPage = () => (
  <ApolloProvider client={client}>
    <UserCreationForm />
  </ApolloProvider>
);

export default Page;
