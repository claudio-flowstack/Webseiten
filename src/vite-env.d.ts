/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface Window {
  dataLayer?: (Record<string, unknown> | unknown[])[];
  umami?: {
    track: (event: string, data?: Record<string, unknown>) => void;
  };
  fbq?: (...args: unknown[]) => void;
  _fbq?: (...args: unknown[]) => void;
}
