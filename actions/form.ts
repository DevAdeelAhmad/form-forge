"use server";

import { currentUser } from "@clerk/nextjs";

class UserNotFoundError extends Error {}

export async function getFormStats() {
  const user = currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
}
