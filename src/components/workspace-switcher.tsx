"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetWorkspaces } from "@/features/workspaces/api";
import {
  useCreateWorkSpaceModal,
  useWorkspaceId,
} from "@/features/workspaces/hooks";
import { useRouter } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export function WorkspaceSwitcher() {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { open } = useCreateWorkSpaceModal();

  const { data: workspaces, isLoading } = useGetWorkspaces();

  const onSelect = (id: string) => {
    router.push(`/workspaces/${id}`);
  };

  const currentWorkspace = workspaces?.documents.find(
    (workspace) => workspace.$id === workspaceId
  );

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={open}
          title="Create Workspace"
        />
      </div>

      <Select onValueChange={onSelect} value={workspaceId} disabled={isLoading}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-2">
          <SelectValue placeholder="Select workspace">
            {currentWorkspace && (
              <div className="flex items-center gap-2">
                <p className="text-lg">{currentWorkspace.emoji}</p>
                <p className="truncate">{currentWorkspace.name}</p>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center gap-2">
                <p className="text-lg">{workspace.emoji}</p>
                <p className="truncate">{workspace.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
