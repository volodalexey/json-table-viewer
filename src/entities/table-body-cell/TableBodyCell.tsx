import React, { PropsWithChildren } from "react";

export function TableBodyCell({ children }: PropsWithChildren) {
  return <td>{children}</td>;
}
