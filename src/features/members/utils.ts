import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Databases, Query } from "node-appwrite";

type Props = {
  databases: Databases;
  workspaceId: string;
  userId: string;
};

export async function getMember({ databases, workspaceId, userId }: Props) {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ]);

  return members.documents[0];
}
