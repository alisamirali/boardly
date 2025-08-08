"use client";

import { Modal } from "@/components/modal";
import { CreateProjectForm } from "@/features/projects/components";
import { useCreateProjectModal } from "@/features/projects/hooks";

export function CreateProjectModal() {
  const { isOpen, setIsOpen, close } = useCreateProjectModal();

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={close} />
    </Modal>
  );
}
