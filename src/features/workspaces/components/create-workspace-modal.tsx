"use client";

import { Modal } from "@/components/modal";
import { CreateWorkspaceForm } from "@/features/workspaces/components";
import { useCreateWorkSpaceModal } from "@/features/workspaces/hooks";

export function CreateWorkspaceModal() {
  const { isOpen, setIsOpen, close } = useCreateWorkSpaceModal();

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={close} />
    </Modal>
  );
}
