import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "shell" | "prose";
};

export function Container({ children, className, size = "shell" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-(--spacing-gutter)",
        size === "shell" ? "max-w-(--container-shell)" : "max-w-(--container-prose)",
        className,
      )}
    >
      {children}
    </div>
  );
}
