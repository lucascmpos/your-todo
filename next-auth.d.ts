/* eslint-disable no-unused-vars */
import { DefaultSession } from "next-auth";

declare export module "next-auth" {
  interface Session {
    user: {
      id?: string;
    } & DefaultSession["user"];
  }
}
