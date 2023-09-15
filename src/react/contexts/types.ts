export type AsyncData<T> =
  | {
      isLoading: boolean;
      data?: T;
    }
  | undefined;
