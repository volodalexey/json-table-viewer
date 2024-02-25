import { TTransformed, isNumberType, isStringType } from "../../shared/lib/transform";

type TSortDirection = "ASC" | "DESC";

export type TSortSetting = {
  sortBy: string;
  sortDirection: TSortDirection;
};

function calcNewSortDirection(
  activeSort?: TSortSetting,
): TSortDirection | undefined {
  if (activeSort) {
    switch (activeSort.sortDirection) {
      case "ASC":
        return "DESC";
      case "DESC":
        return;
    }
  }
  return "ASC";
}

/**
 * do not mutate original activeSorts array
 */
export function calcNewActiveSorts({
  activeSort,
  activeSortIdx,
  activeSorts,
  sortBy,
  multiple = true,
}: {
  activeSort?: TSortSetting;
  activeSortIdx: number;
  activeSorts: TSortSetting[];
  sortBy: string;
  multiple?: boolean;
}) {
  const newSortDirection = calcNewSortDirection(activeSort);
  let newActiveSorts: TSortSetting[] = [];
  if (newSortDirection) {
    const newActiveSort = { sortBy, sortDirection: newSortDirection };
    if (activeSort) {
      // change sort
      newActiveSorts = activeSorts.map((s, i) => {
        if (i === activeSortIdx) {
          return newActiveSort;
        }
        return s;
      });
    } else {
      // add sort
      if (multiple) {
        newActiveSorts = activeSorts.concat([newActiveSort]);
      } else {
        newActiveSorts = [newActiveSort];
      }
    }
  } else if (activeSort && activeSortIdx >= 0) {
    // remove sort
    newActiveSorts = activeSorts.filter((s, i) => i !== activeSortIdx);
  }
  return newActiveSorts;
}

export function sortData({
  parsed,
  activeSorts,
}: {
  parsed: TTransformed;
  activeSorts: TSortSetting[];
}) {
  let sortedData = parsed.data;
  if (activeSorts.length) {
    sortedData = parsed.data.sort((a, b) => {
      let notEqual = false;
      let result = 0;
      activeSorts.some((as) => {
        const directionFactor = as.sortDirection === "DESC" ? -1 : 1;
        const aValue = a[as.sortBy];
        const aType = typeof aValue;
        const bValue = b[as.sortBy];
        const bType = typeof bValue;
        const valueType = parsed.columns.get(as.sortBy)?.type;
        if (valueType) {
          switch (valueType) {
            case "string":
              if (isStringType(aValue, aType) && isStringType(bValue, bType)) {
                if (aValue < bValue) {
                  result = -1 * directionFactor;
                  notEqual = true;
                } else if (aValue > bValue) {
                  result = directionFactor;
                  notEqual = true;
                }
              } else if (
                isStringType(aValue, aType) &&
                !isStringType(bValue, bType)
              ) {
                result = directionFactor;
                notEqual = true;
              } else if (
                !isStringType(aValue, aType) &&
                isStringType(bValue, bType)
              ) {
                result = -1 * directionFactor;
                notEqual = true;
              }
              break;
            case "number":
              if (isNumberType(aValue, aType) && isNumberType(bValue, bType)) {
                if (aValue < bValue) {
                  result = -1 * directionFactor;
                  notEqual = true;
                } else if (aValue > bValue) {
                  result = directionFactor;
                  notEqual = true;
                }
              } else if (
                isNumberType(aValue, aType) &&
                !isNumberType(bValue, bType)
              ) {
                result = directionFactor;
                notEqual = true;
              } else if (
                !isNumberType(aValue, aType) &&
                isNumberType(bValue, bType)
              ) {
                result = -1 * directionFactor;
                notEqual = true;
              }
              break;
          }
        }
        return notEqual;
      });
      return result;
    });
  }
  return sortedData;
}
