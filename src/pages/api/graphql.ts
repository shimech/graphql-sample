import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { join } from "path";
import { Resolvers } from "~/graphql/dist/generated-server";
import { readFileSync } from "fs";

const path = join(process.cwd(), "src", "graphql", "schema.graphql");
const typeDefs = readFileSync(path).toString("utf-8");
const resolvers: Resolvers = {};
const apolloServer = new ApolloServer({ resolvers, typeDefs });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await apolloServer.start();
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
