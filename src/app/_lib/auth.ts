import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";
import { createStripeCustomer } from "@/services/stripe";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = { ...session.user, id: user.id };

      return session;
    },
  },
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        name: message.user.name as string,
        email: message.user.email as string,
      })
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
