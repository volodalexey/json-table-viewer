import React, { PropsWithChildren } from "react";

import { TColumnSetting } from "../../shared/defaults/keys";

type Props = Partial<TColumnSetting>;

export function TableHeaderCell({ children }: PropsWithChildren<Props>) {
  return <th>{children}</th>;
}
