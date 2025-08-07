import z from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  workspaceId: z.string(),
  emoji: z.string(),
});
