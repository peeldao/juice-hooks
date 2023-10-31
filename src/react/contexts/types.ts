export type AsyncData<T> = {
  isLoading: boolean;
  data?: T;
};

export const EMPTY_ASYNC_DATA: AsyncData<any> = {
  isLoading: false,
  data: undefined,
};
