"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <AlertTriangle className="size-8 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong!</p>
      <Button variant="secondary" asChild size="sm">
        <Link href="/">Back To Home</Link>
      </Button>
    </div>
  );
}
