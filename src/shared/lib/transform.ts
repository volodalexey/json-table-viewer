type TType =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "undefined"
  | "object"
  | "function"
  | "symbol";

type TMapItem = {
  name: string;
  type: TType;
  index: number;
};

type TMap = Map<string, TMapItem>;

export type TData = Array<Record<string, TType>>;

export type TTransformed = {
  columns: TMap;
  data: TData;
};

export function transformData(_data: unknown): TTransformed {
  const columns: TMap = new Map();
  const data: TData = [];
  if (Array.isArray(_data)) {
    _data.map((d) => {
      if (typeof d === "object") {
        Object.entries(d).forEach(([key, value], idx) => {
          if (!columns.has(key)) {
            columns.set(key, {
              name: key,
              type: typeof value,
              index: idx,
            });
          }
        });
        data.push(d);
      }
    });
  }
  return { columns, data };
}

export function isNumberType(data: unknown, dataType: TType): data is number {
  return dataType === "number";
}

export function isStringType(data: unknown, dataType: TType): data is string {
  return dataType === "string";
}
