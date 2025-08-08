"use client";

import { DatePicker } from "@/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMembers } from "@/features/members/api";
import { useGetProjects } from "@/features/projects/api";
import { useTaskFilters } from "@/features/tasks/hooks";
import { TaskStatuses } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { FolderIcon, ListChecksIcon, UserIcon } from "lucide-react";
import { Fragment } from "react";

type Props = {
  hideProjectFilter?: boolean;
};

const statusOptions = [
  { value: "all", label: "All", isSeparatorAfter: true },
  { value: TaskStatuses.BACKLOG, label: "Backlog" },
  { value: TaskStatuses.TODO, label: "Todo" },
  { value: TaskStatuses.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatuses.IN_REVIEW, label: "In Review" },
  { value: TaskStatuses.DONE, label: "Done" },
];

export function DataFilters({ hideProjectFilter }: Props) {
  const workspaceId = useWorkspaceId();
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });
  const [{ status, assigneeId, projectId, dueDate }, setFilters] =
    useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : (value as TaskStatuses) });
  };

  const onAssigneeChange = (value: string) => {
    setFilters({ assigneeId: value === "all" ? null : (value as string) });
  };

  const onProjectChange = (value: string) => {
    setFilters({ projectId: value === "all" ? null : (value as string) });
  };

  const isLoading = isLoadingProjects || isLoadingMembers;

  const projectsOptions = projects?.documents.map((project) => ({
    value: project.$id,
    label: project.name,
    emoji: project.emoji,
  }));

  const membersOptions = members?.documents.map((member) => ({
    value: member.$id,
    label: member.name,
  }));

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
        <SelectTrigger className="w-full lg:flex-1 h-8">
          <div className="flex items-center pr-2">
            <ListChecksIcon className="size-4 mr-2" />
            <SelectValue placeholder="All statuses" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(({ value, label, isSeparatorAfter }) => (
            <Fragment key={value}>
              <SelectItem value={value} className="cursor-pointer">
                {label}
              </SelectItem>
              {isSeparatorAfter && <SelectSeparator />}
            </Fragment>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={assigneeId ?? undefined}
        onValueChange={(value) => onAssigneeChange(value)}
      >
        <SelectTrigger className="w-full lg:flex-1 h-8">
          <div className="flex items-center pr-2">
            <UserIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Assignees" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer">
            All Assignees
          </SelectItem>
          <SelectSeparator />
          {membersOptions?.map((member) => (
            <SelectItem
              key={member.value}
              value={member.value}
              className="cursor-pointer"
            >
              {member.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue={projectId ?? undefined}
        onValueChange={(value) => onProjectChange(value)}
      >
        <SelectTrigger className="w-full lg:flex-1 h-8">
          <div className="flex items-center pr-2">
            <FolderIcon className="size-4 mr-2" />
            <SelectValue placeholder="All Projects" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer">
            All Projects
          </SelectItem>
          <SelectSeparator />
          {projectsOptions?.map((project) => (
            <SelectItem
              key={project.value}
              value={project.value}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-start gap-1">
                <p>{project.emoji}</p>
                <p>{project.label}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        placeholder="Due date"
        className="h-8 w-full lg:flex-1"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null });
        }}
      />
    </div>
  );
}
