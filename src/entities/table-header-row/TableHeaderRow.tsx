import React, { PropsWithChildren } from "react";

export function TableHeaderRow({ children }: PropsWithChildren) {
  return <tr>{children}</tr>;
}
