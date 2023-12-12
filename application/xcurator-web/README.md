This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

What this will do, is it will expose the needed environment variables so that they get injected at runtime. This is done thanks 

to this library https://github.com/expatfile/next-runtime-env. 

The configuration is done in the `next.config.js` file. The variables that are prefixed with `NEXT_PUBLIC_` will be exposed to the client side.

Then run the application in development mode.

Open [http://localhost:1234](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/intern.tsx`. The page auto-updates as you edit the file.

