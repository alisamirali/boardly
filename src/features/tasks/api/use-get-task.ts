import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type Props = {
  taskId: string;
};

export const useGetTask = ({ taskId }: Props) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await client.api.tasks[":taskId"].$get({
        param: {
          taskId,
        },
      });

      if (!res.ok) throw new Error("Failed to get task");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
