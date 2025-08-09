import { Navbar, Sidebar } from "@/components";
import { CreateProjectModal } from "@/features/projects/components";
import { CreateTaskModal, EditTaskModal } from "@/features/tasks/components";
import { CreateWorkspaceModal } from "@/features/workspaces/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />

      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>

        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />

            <main className="h-full px-6 py-8 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
