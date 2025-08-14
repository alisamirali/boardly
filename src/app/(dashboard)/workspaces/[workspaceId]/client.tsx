"use client";

import {
  Analytics,
  DottedSeparator,
  PageError,
  PageLoader,
} from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api";
import { MemberAvatar } from "@/features/members/components";
import { Member } from "@/features/members/types";
import { useGetProjects } from "@/features/projects/api";
import { useCreateProjectModal } from "@/features/projects/hooks";
import { Project } from "@/features/projects/types";
import { useGetTasks } from "@/features/tasks/api";
import { useCreateTaskModal } from "@/features/tasks/hooks";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export function WorkspaceIdClient() {
  const workspaceId = useWorkspaceId();

  const { data: analytics, isLoading: isAnalyticsLoading } =
    useGetWorkspaceAnalytics({ workspaceId });

  const { data: tasks, isLoading: isTasksLoading } = useGetTasks({
    workspaceId,
  });

  const { data: projects, isLoading: isProjectsLoading } = useGetProjects({
    workspaceId,
  });

  const { data: members, isLoading: isMembersLoading } = useGetMembers({
    workspaceId,
  });

  const isLoading =
    isAnalyticsLoading ||
    isTasksLoading ||
    isProjectsLoading ||
    isMembersLoading;

  if (isLoading) return <PageLoader />;
  if (!analytics || !tasks || !projects || !members)
    return <PageError message="Failed to load workspace data" />;

  return (
    <div className="h-full flex flex-col space-y-4">
      <Analytics data={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <TaskList data={tasks.documents} total={tasks.total} />
        <ProjectList data={projects.documents} total={projects.total} />
        <MemberList data={members.documents} total={members.documents.length} />
      </div>
    </div>
  );
}

type TaskListProps = {
  data: Task[];
  total: number;
};

function TaskList({ data, total }: TaskListProps) {
  const { open: createTask } = useCreateTaskModal();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tasks ({total})</p>
          <Button variant="muted" size="icon" onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <ul className="flex flex-col gap-y-4">
          {data.map((task) => (
            <li key={task.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-base font-medium truncate mb-1">
                      {task.name}
                    </p>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm text-muted-foreground">
                        {task.project?.name}
                      </p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="text-sm text-muted-foreground flex items-center">
                        <CalendarIcon className="size-3 mr-1" />
                        <span className="truncate">
                          {formatDistanceToNow(new Date(task.dueDate))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No tasks found
          </li>
        </ul>

        <Button variant="muted" className="mt-4 w-full" asChild>
          <Link href={`/workspaces/${workspaceId}/tasks`}>Show All</Link>
        </Button>
      </div>
    </div>
  );
}

type ProjectListProps = {
  data: Project[];
  total: number;
};

function ProjectList({ data, total }: ProjectListProps) {
  const { open: createProject } = useCreateProjectModal();
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({total})</p>
          <Button variant="secondary" size="icon" onClick={createProject}>
            <PlusIcon className="size-4 text-neutral-400" />
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.map((project) => (
            <li key={project.$id}>
              <Link href={`/workspaces/${workspaceId}/tasks/${project.$id}`}>
                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-1.5">
                    <p className="text-base font-medium">{project.emoji}</p>
                    <p className="text-base font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No projects found
          </li>
        </ul>
      </div>
    </div>
  );
}

type MembersListProps = {
  data: Member[];
  total: number;
};

function MemberList({ data, total }: MembersListProps) {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Members ({total})</p>
          <Button variant="secondary" size="icon" asChild>
            <Link href={`/workspaces/${workspaceId}/members`}>
              <SettingsIcon className="size-4 text-neutral-400" />
            </Link>
          </Button>
        </div>

        <DottedSeparator className="my-4" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none rounded-lg overflow-hidden">
                <CardContent className="p-3 flex flex-col items-center gap-y-2">
                  <MemberAvatar className="size-12" name={member.name} />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-base font-medium line-clamp-1">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}

          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No members found
          </li>
        </ul>
      </div>
    </div>
  );
}
