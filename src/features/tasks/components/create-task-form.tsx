"use client";

import { DatePicker, DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MemberAvatar } from "@/features/members/components";
import { useCreateTask } from "@/features/tasks/api";
import { createTaskFormSchema } from "@/features/tasks/schemas";
import { TaskStatuses } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

type Props = {
  onCancel?: () => void;
  projectOptions: {
    id: string;
    name: string;
    emoji: string;
  }[];
  memberOptions: {
    id: string;
    name: string;
  }[];
  defaultProjectId?: string;
};

const taskStatusOptions = [
  { value: TaskStatuses.BACKLOG, label: "Backlog" },
  { value: TaskStatuses.TODO, label: "Todo" },
  { value: TaskStatuses.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatuses.IN_REVIEW, label: "In Review" },
  { value: TaskStatuses.DONE, label: "Done" },
];

export function CreateTaskForm({
  onCancel,
  projectOptions,
  memberOptions,
  defaultProjectId,
}: Props) {
  const { mutate, isPending } = useCreateTask();
  const workspaceId = useWorkspaceId();

  const form = useForm<z.infer<typeof createTaskFormSchema>>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      name: "",
      status: TaskStatuses.TODO,
      projectId: defaultProjectId,
      dueDate: "",
      assigneeId: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof createTaskFormSchema>) => {
    console.log("Form values:", values);

    const taskData = {
      name: values.name,
      status: values.status as TaskStatuses,
      workspaceId,
      projectId: values.projectId,
      dueDate: values.dueDate
        ? new Date(values.dueDate).toISOString()
        : new Date().toISOString(),
      assigneeId: values.assigneeId,
      description: values.description,
    };

    console.log("Task data being sent:", taskData);

    mutate(
      { json: taskData },
      {
        onSuccess: () => {
          form.reset();
          onCancel?.();
        },
        onError: (error) => {
          console.error("Task creation error:", error);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new task</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              {/* Task Name */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Due Date */}
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => {
                          field.onChange(date ? date.toISOString() : "");
                        }}
                        placeholder="Select due date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select Assignee */}
              <FormField
                name="assigneeId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {memberOptions.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-2">
                              <MemberAvatar
                                className="size-6"
                                name={member.name}
                              />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Select Project */}
              <FormField
                name="projectId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {projectOptions.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id}
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-lg">{project.emoji}</span>
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Select Status */}
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        {taskStatusOptions.map((status) => (
                          <SelectItem
                            key={status.value}
                            value={status.value}
                            className="cursor-pointer"
                          >
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Enter task description"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DottedSeparator className="py-7" />

            <div className="flex items-center justify-end gap-4">
              {onCancel && (
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={isPending}
              >
                Create Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
