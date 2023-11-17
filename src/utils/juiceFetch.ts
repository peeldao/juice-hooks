export type JuiceFetchProps = {
  url: string;
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  timeout?: number;
  body?: string;
};

/**
 * Fetch a JSON resource from a URL.
 *
 * @remarks This function will throw an error if the request fails or times out.
 *
 * @example
 * ```ts
 * const metadata = await juiceFetch<JB721DelegateTierMetadata>({
 *  url: ipfsUrl,
 * timeout: args?.requestTimeout ?? REQUEST_TIMEOUT_MS,
 * });
 * ```
 *
 * @throws If the request fails or times out.
 *
 * @returns The JSON resource at the given URL.
 */
export const juiceFetch = async <T>(
  props: JuiceFetchProps
): Promise<T | undefined> => {
  const { url, method = "GET", headers, timeout, body } = props;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout ?? 30000);

  try {
    const res = await fetch(url, {
      method,
      headers,
      signal: controller.signal,
      body,
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${method} ${url}: ${res.status} ${res.statusText}`
      );
    }

    return (await res.json()) as T;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      throw new Error(`Request timed out: ${method} ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
};
