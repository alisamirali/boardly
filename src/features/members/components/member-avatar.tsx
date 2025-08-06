import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  className?: string;
  fallbackClassName?: string;
};

export function MemberAvatar({ name, className, fallbackClassName }: Props) {
  return (
    <Avatar
      className={cn(
        "size-5 rounded-full transition border border-neutral-300",
        className
      )}
    >
      <AvatarFallback
        className={cn(
          "border-e-neutral-200 font-medium text-neutral-500 flex items-center justify-center",
          fallbackClassName
        )}
      >
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
