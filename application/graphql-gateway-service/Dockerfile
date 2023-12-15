# https://hub.docker.com/_/node/
FROM node:16-alpine AS builder
RUN apk update && apk add yarn --no-cache
ENV NODE_ENV production
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
COPY lib/ lib/
RUN yarn install
RUN yarn build

# Runner image, with compiled code only
FROM node:16-alpine AS runner
RUN apk update && apk add yarn --no-cache
ENV NODE_ENV production
COPY --from=builder /app/package.json /
COPY --from=builder /app/dist /dist
COPY --from=builder /app/node_modules /node_modules

EXPOSE 8080
CMD ["yarn", "start"]
