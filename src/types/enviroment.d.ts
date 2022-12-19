export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_KEY: string;
      PORT: number;
      FB_APP_SECRET: string;
      FB_APP_ID: string;
      NODE_ENV: "development" | "production";
    }
  }
}

declare module "passport-facebook" {
  interface Profile {
    first_name: string;
    last_name: string;
    picture: {
      data: {
        url: string;
      };
    };
    email: string;
  }
}
