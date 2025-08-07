"use client";

import { Modal } from "@/components/modal";
import { CreateProjectForm } from "@/features/projects/components";
import { useCreateProjectModal } from "@/features/projects/hooks";
import { useParams } from "next/navigation";

export function CreateProjectModal() {
  const { workspaceId } = useParams();
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </Modal>
  );
}
