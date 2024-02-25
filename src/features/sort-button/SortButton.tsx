import React from "react";

import { Button, Props as ButtonProps } from "../../shared/ui/Button";
import { TSortSetting, calcNewActiveSorts } from "./sort";

type NewType = {
  sortBy: string;
  activeSorts: TSortSetting[];
  setActiveSorts: React.Dispatch<React.SetStateAction<TSortSetting[]>>;
};

type Props = ButtonProps & NewType;

export function SortButton(props: Props) {
  const { sortBy, activeSorts, setActiveSorts } = props;
  const activeSortIdx = activeSorts.findIndex((as) => as.sortBy === sortBy);
  const activeSort = activeSorts[activeSortIdx];
  return (
    <Button
      {...props}
      onClick={() => {
        const newActiveSorts = calcNewActiveSorts({
          activeSort,
          activeSortIdx,
          activeSorts,
          sortBy,
        });
        setActiveSorts(newActiveSorts);
      }}
    >
      {activeSort && activeSort.sortDirection === "ASC" ? <>⬆️</> : null}
      {activeSort && activeSort.sortDirection === "DESC" ? <>⬇️</> : null}
      {!activeSort ? <>📶</> : null}
    </Button>
  );
}
