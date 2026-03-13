import type { backendInterface } from "./backend";
import { createActorWithConfig } from "./config";

let _backend: backendInterface | null = null;

async function getBackend(): Promise<backendInterface> {
  if (!_backend) {
    _backend = await createActorWithConfig();
  }
  return _backend;
}

export const backend = new Proxy({} as backendInterface, {
  get(_target, prop: string) {
    return async (...args: unknown[]) => {
      const b = await getBackend();
      // biome-ignore lint/suspicious/noExplicitAny: proxy
      return (b as any)[prop](...args);
    };
  },
});
