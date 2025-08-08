import { TaskStatuses } from "@/features/tasks/types";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export function useTaskFilters() {
  return useQueryStates({
    projectId: parseAsString,
    status: parseAsStringEnum(Object.values(TaskStatuses)),
    assigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
  });
}
