interface AsyncData<T> {
  isLoading: boolean;
  data: T | undefined;
}

const AsyncDataNone: AsyncData<any> = {
  isLoading: false,
  data: undefined,
};

export { AsyncData, AsyncDataNone };
