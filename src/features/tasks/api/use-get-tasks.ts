import { TaskStatuses } from "@/features/tasks/types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatuses | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
};

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  dueDate,
  search,
}: Props) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      search,
      assigneeId,
      dueDate,
    ],
    queryFn: async () => {
      const res = await client.api.tasks.$get({
        query: {
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          assigneeId: assigneeId ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!res.ok) throw new Error("Failed to get tasks");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
