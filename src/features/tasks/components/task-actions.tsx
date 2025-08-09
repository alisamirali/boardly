import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  id: string;
  projectId: string;
  children: ReactNode;
};

export function TaskActions({ id, projectId, children }: Props) {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => {}}
            className="cursor-pointer font-medium"
            disabled={false}
          >
            <ExternalLinkIcon className="size-4" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="cursor-pointer font-medium"
            disabled={false}
          >
            <ExternalLinkIcon className="size-4" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="cursor-pointer font-medium"
            disabled={false}
          >
            <PencilIcon className="size-4" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            className="cursor-pointer font-medium text-amber-700 focus:text-amber-700"
            disabled={false}
          >
            <TrashIcon className="size-4" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
