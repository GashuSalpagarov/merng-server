import { ApolloServer, PubSub } from "apollo-server";
import mongoose from "mongoose";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers/index";
import { MONGODB } from "./config";

const PORT = process.env.PORT || 5000;
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB, { useNewUrlParser: true });
    console.log("MongoDB connected");

    const res = await server.listen({ port: PORT });
    console.log(`Server running at ${res.url}`);
  } catch (error) {
    console.error(error);
  }
};

connectDB();
