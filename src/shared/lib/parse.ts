export type TParsed = unknown;

export type TResultSuccess<SuccessReturn = unknown> = {
  success: true;
  returned: SuccessReturn;
};

export type TResultError<ErrorReturn = Error> = {
  success: false;
  returned: ErrorReturn;
};

export type TResult<SuccessReturn = unknown, ErrorReturn = Error> =
  | TResultSuccess<SuccessReturn>
  | TResultError<ErrorReturn>;

export function parseData<SuccessReturn = unknown, ErrorReturn = Error>(
  rawData: string,
): TResult<SuccessReturn, ErrorReturn> {
  try {
    return { success: true, returned: JSON.parse(rawData) };
  } catch (error) {
    return { success: false, returned: error as ErrorReturn };
  }
}
