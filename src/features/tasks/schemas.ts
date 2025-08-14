import { TaskStatuses } from "@/features/tasks/types";
import z from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.nativeEnum(TaskStatuses, { error: "Required" }),
  workspaceId: z.string().trim().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

export const createTaskFormSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.string().optional(),
  assigneeId: z.string().trim().min(1, "Required"),
  description: z.string().optional(),
});

export const editTaskFormSchema = z.object({
  name: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  projectId: z.string().trim().min(1, "Required"),
  dueDate: z.string().optional(),
  assigneeId: z.string().trim().min(1, "Required"),
});
