import z from "zod";

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  workspaceId: z.string(),
  emoji: z.string(),
});

export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Minimum on character required").optional(),
  emoji: z.string().optional(),
});
