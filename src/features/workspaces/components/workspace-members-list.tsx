"use client";

import { DottedSeparator } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteMember,
  useGetMembers,
  useUpdateMember,
} from "@/features/members/api";
import { MemberAvatar } from "@/features/members/components";
import { MemberRole } from "@/features/members/types";
import { useWorkspaceId } from "@/features/workspaces/hooks";
import { useConfirm } from "@/hooks";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { toast } from "sonner";

export function WorkspaceMembersList() {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "Are you sure you want to remove this member from the workspace?",
    "destructive"
  );

  const { data: members } = useGetMembers({ workspaceId });
  const { mutate: removeMember, isPending: isDeleting } = useDeleteMember();
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember();

  const handleUpdateMemberRole = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleRemoveMember = async (memberId: string) => {
    const ok = await confirm();

    if (!ok) return;

    removeMember(
      {
        param: { memberId },
      },
      {
        onSuccess: () => {
          toast.success("Member removed successfully");
          window.location.reload();
        },
        onError: () => {
          toast.error("Failed to remove member");
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />

      <CardHeader className="flex flex-row items-center gap-x-4 py-7 space-y-0">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Link>
        </Button>

        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        {members?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                className="size-10"
                fallbackClassName="text-lg"
                name={member.name}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto" variant="secondary" size="icon">
                    <MoreVerticalIcon className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium cursor-pointer"
                    onClick={() =>
                      handleUpdateMemberRole(member.$id, MemberRole.ADMIN)
                    }
                    disabled={isUpdating}
                  >
                    Set as admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium cursor-pointer"
                    onClick={() =>
                      handleUpdateMemberRole(member.$id, MemberRole.MEMBER)
                    }
                    disabled={isUpdating}
                  >
                    Set as member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700 cursor-pointer"
                    onClick={() => handleRemoveMember(member.$id)}
                    disabled={isDeleting}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {index < members.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
