import React, { useEffect, useState } from "react";
import { TableHeader } from "../../entities/table-header/TableHeader";
import { TableHeaderCell } from "../../entities/table-header-cell/TableHeaderCell";
import { TTransformed } from "../../shared/lib/transform";
import { TableHeaderRow } from "../../entities/table-header-row/TableHeaderRow";

import { TableBody } from "../../entities/table-body/TableBody";
import { TableBodyRow } from "../../entities/table-body-row/TableBodyRow";
import { TableBodyCell } from "../../entities/table-body-cell/TableBodyCell";
import { SortButton } from "../../features/sort-button/SortButton";
import { TSortSetting, sortData } from "../../features/sort-button/sort";

type Props = {
  parsedData: TTransformed;
};

export function Table({ parsedData }: Props) {
  const [activeSorts, setActiveSorts] = useState<TSortSetting[]>([]);
  useEffect(() => {
    setActiveSorts([]);
  }, [parsedData]);

  return (
    <table>
      <TableHeader>
        <TableHeaderRow>
          {[...parsedData.columns.values()].map((c) => {
            return (
              <TableHeaderCell key={c.name} row={c.index}>
                {c.name}
                <SortButton
                  sortBy={c.name}
                  activeSorts={activeSorts}
                  setActiveSorts={setActiveSorts}
                />
              </TableHeaderCell>
            );
          })}
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {sortData({ parsed: parsedData, activeSorts }).map((d, idx) => (
          <TableBodyRow key={idx}>
            {Object.entries(d).map(([key, value]) => (
              <TableBodyCell key={key}>{value}</TableBodyCell>
            ))}
          </TableBodyRow>
        ))}
      </TableBody>
    </table>
  );
}
