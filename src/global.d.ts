export {};

declare global {
  interface Window {
    freighter?: {
      getPublicKey: () => Promise<string>;
    };
  }
}
