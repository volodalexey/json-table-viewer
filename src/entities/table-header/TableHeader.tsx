import React, { PropsWithChildren } from "react";

export function TableHeader({ children }: PropsWithChildren) {
  return <thead>{children}</thead>;
}
