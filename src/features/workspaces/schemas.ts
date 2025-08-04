import z from "zod";

export const createWorkspacesSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export const updateWorkspacesSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must be 1 or more characters")
    .optional(),
});
