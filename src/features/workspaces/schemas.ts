import z from "zod";

export const workspaceSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  emoji: z.string().optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be 1 or more characters")
    .optional(),
  emoji: z.string(),
});
