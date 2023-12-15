# https://hub.docker.com/_/node/
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM node:19-alpine AS deps
RUN apk update && apk add yarn --no-cache && apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./

ENV NODE_ENV production
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install

# Rebuild the source code only when needed
FROM node:19-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1


RUN yarn build

# Production image, copy all the files and run next
FROM node:19-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs &&\
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Workaround for https://github.com/expatfile/next-runtime-env/issues/62, standalone node_modules are too "optimized" for next-runtime-env
# Warning: size increase from 246Mb to 700Mb!
#COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/ ./node_modules/
# This approach is uglier, but is much smaller in size
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/next-runtime-env/ ./node_modules/next-runtime-env/
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/chalk/ ./node_modules/chalk/
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/ansi-styles/ ./node_modules/ansi-styles/
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/supports-color/ ./node_modules/supports-color/
COPY --from=deps    --chown=nextjs:nodejs /app/node_modules/has-flag/ ./node_modules/has-flag/

RUN mkdir -p /app/public && chown -R nextjs:nodejs /app/public

USER nextjs

EXPOSE 3000
ENV PORT 3000

# Workaround: configure is NOT executed by default via "node" (unlike with yarn dev)
CMD node -e "const { configureRuntimeEnv } = require('next-runtime-env/build/configure'); configureRuntimeEnv();" && node server.js
