import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      const res = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!res.ok) throw new Error("Failed to get projects");

      const { data } = await res.json();

      return data;
    },
  });

  return query;
};
