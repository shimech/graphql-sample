import type { NextApiRequest, NextApiResponse } from "next";
import type { Resolvers, User } from "~/graphql/dist/generated-server";
import { ApolloServer } from "apollo-server-micro";
import { join } from "path";
import { readFileSync } from "fs";

const path = join(process.cwd(), "src", "graphql", "schema.graphql");
const typeDefs = readFileSync(path).toString("utf-8");

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Shuntaro Shimizu" },
];
const resolvers: Resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => {
      const user = users.find((user) => user.id === id);
      return user || null;
    },
  },
};

const apolloServer = new ApolloServer({ resolvers, typeDefs });
const startServer = apolloServer.start();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
