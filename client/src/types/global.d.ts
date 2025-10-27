// Global type definitions to fix TypeScript errors
declare module 'web-push' {
  export interface PushSubscription {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }
  
  export function setVapidDetails(
    subject: string,
    publicKey: string,
    privateKey: string
  ): void;
  
  export function sendNotification(
    subscription: PushSubscription,
    payload: string,
    options?: any
  ): Promise<any>;
}

declare module 'jsdom' {
  export class JSDOM {
    constructor(html?: string, options?: any);
    window: Window;
  }
}

declare module 'cheerio' {
  export interface Element {
    name: string;
    attribs: { [key: string]: string };
    children: Element[];
  }
  
  export function load(html: string): any;
}

declare module 'jquery' {
  export const $: any;
}

// Fix for hreflang attribute
declare namespace React {
  interface LinkHTMLAttributes<T> {
    hreflang?: string;
  }
}

// Global types for database
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export {};
