import React, { PropsWithChildren } from "react";

export function TableBodyRow({ children }: PropsWithChildren) {
  return <tr>{children}</tr>;
}
