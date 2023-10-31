interface AsyncData<T> {
  isLoading: boolean;
  data?: T;
}

const AsyncDataNone: AsyncData<any> = {
  isLoading: false,
};

export { AsyncData, AsyncDataNone };
