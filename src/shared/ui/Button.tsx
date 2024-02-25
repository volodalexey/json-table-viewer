import React, { PropsWithChildren, MouseEvent } from "react";

import { cn } from "../lib/cn";

export type Props = {
  type?: HTMLButtonElement["type"];
  isDisabled?: boolean;
  title?: string;
  onClick?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => unknown;
  className?: string;
  value?: string;
};

export function Button({
  type = "button",
  isDisabled,
  title,
  onClick,
  className,
  value,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      title={title}
      className={cn(
        className,
        "py-2.5 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200",
        "hover:bg-gray-100 hover:text-blue-700",
        "focus:outline-none focus:ring-4 focus:ring-gray-200",
        "disabled:bg-gray-200 disabled:cursor-not-allowed",
      )}
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
}
