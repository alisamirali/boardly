"use client";

import { Sidebar } from "@/components";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileSidebar() {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpened} onOpenChange={setIsOpened}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden" size="icon">
          <MenuIcon className="size-5 text-neutral-500" />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0" side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
