import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Detects whether the device is running iOS or Android
 * by checking the user agent string. Returns false on the server.
 */
export function useIsMobileOS() {
  return useSyncExternalStore(
    emptySubscribe,
    () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
    () => false,
  );
}
