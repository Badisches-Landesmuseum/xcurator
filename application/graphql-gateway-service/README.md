# GraphQL Gateway

Gerion Herbst | Sören Räuchle | Nadav Babai | Raphael Tilgner | Elyess Eleuch | Aleksejs Spiridonovs @ [3pc GmbH](https://www.3pc.de)

GraphQL [Apollo Federation Gateway](https://www.apollographql.com/docs/federation/) which builds a Data Graph by stitching multiple Sub-Graphs together.
This implementation is responsible for:
- Application Gateway
- Client Entrypoint
- Authorization ([OpenID Connect](https://openid.net/connect/))
- Session Management

## Table of Content
- [GraphQL Gateway](#graphql-gateway)
  - [Table of Content](#table-of-content)
  - [Technology Stack (JS | TS)](#technology-stack-js--ts)
  - [Service Dependencies](#service-dependencies)
  - [Running with Docker](#running-with-docker)
  - [Environment Variables](#environment-variables)
  - [Updating service list](#updating-service-list)
  - [Build \& Run](#build--run)
  - [More Info](#more-info)
  - [Setting Up Your Editor](#setting-up-your-editor)
  - [Session Management | Authentication](#session-management--authentication)
    - [Requirements](#requirements)
    - [Authorization Flow | Resource Owner Password Flow](#authorization-flow--resource-owner-password-flow)
      - [First option: using the *login* mutation](#first-option-using-the-login-mutation)
      - [Cookie](#cookie)
      - [Session Storage](#session-storage)
      - [Second option: using the *authenticate* mutation](#second-option-using-the-authenticate-mutation)
    - [Secure cookies](#secure-cookies)
  - [curl Testing](#curl-testing)


## Technology Stack (JS | TS)

- Node.js >=14.x || >=16.x
- Express.js
- Apollo GraphQL (Federation)
- Docker

More Info: `./package.json`

## Service Dependencies

- Keycloak | Identity Provider
- BLM IDP | Identity Provider
- Redis | Central Session Storage

More Info: `docker-compose.yml`

## Running with Docker

Image is available on `nexus.3pc.de` Docker repository
GraphQL Service(s) which need to implement the [Federation Spec](https://www.apollographql.com/docs/apollo-server/federation/federation-spec/)
Docker

1. Login `docker login nexus.3pc.de`
2. Enter credentials
3. Pull `docker pull nexus.3pc.de/q8r/graphql-gateway-service`

## Environment Variables

| Name                        | Description                                                                                                                                                    | Default Value | Example Value                                                                       |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------| ----------------------------------------------------------------------------------- |
| GRAPHQL_ENDPOINT_LIST       | Takes a string of services separated by `,` and each service is a pair of `name` & `url` separated by a space (leading and trailing spaces are trimmed)        | -             | `product-service http:://product.3pc.de/graphql, asset-service http://asset.3pc.de` |
| GATEWAY_PORT                | string, sets the port for the gateway service.                                                                                                                 | `8080`        | -                                                                                   |
| GRAPHQL_ENDPOINT            | string, sets the GraphQL endpoint for the gateway service.                                                                                                     | `/graphql`    | -                                                                                   |
| GRAPHQL_PLAYGROUND_ENDPOINT | string, sets the GraphQL endpoint for the playground.                                                                                                          | `/playground` | -                                                                                   |
| GATEWAY_MAX_DEPTH           | integer, accept or reject a request based on its depth.                                                                                                        | `3`           | -                                                                                   |
| KEYCLOAK_ENABLED            | string, should protect the playground of graphql API, eg. /playground                                                                                          | `false`       | `false`                                                                             |
| REDIS_SETUP_TYPE            | string, defines, if Redis is clustered or not. Different configuration syntax is being used in ioredis                                                         | `standalone`  | `standalone` or `cluster`                                                           |
| REDIS_HOST                  | string, sets the host for the redis connection url.                                                                                                            | `localhost`   | -                                                                                   |
| REDIS_PORT                  | integer, sets the port for the redis connection url.                                                                                                           | `6379`        | -                                                                                   |
| REDIS_PASSWORD              | string, sets the password used for the redis connection.                                                                                                       | -             | -                                                                                   |
| DEBUG_ENABLED               | boolean, starts the Apollo Server in debug mode.                                                                                                               | `false`       | -                                                                                   |
| ENVIRONMENT                 | string, controls behavior. In PRODUCTION, restart until all endpoints can be contacted. In DEVELOPMENT, start with incomplete set                              | `DEVELOPMENT` | `PRODUCTION`                                                                        |
| IS_STAGING_OR_PRODUCTION    | boolean, determines if we are running on staging or production to disable introspection (fetching graphql schema) (DUPLICATE OF ENVIRONMENT, NOTE: check this) | `false`       | `false`                                                                             |
| SESSION_SECRET              | string, this should be a long secret                                                                                                                           | -             | -                                                                                   |

N.B. For Xcurator project there are some new variables regarding IDP, please check the env.local.example file.

## Updating service list

1. Modify the service list in the [`e.g. q8r-graphql-gateway-config-map.yaml (for Q8R project)`](https://gitlab.3pc.de/q8r/qurator-solution/-/blob/develop/helm/templates/graphql-gateway-config-map.yaml). Commit will trigger Jenkins job that will apply configuration in Kubernetes.
2. Gracefully restart Kubernetes Deployment.
  - Automatically done by Kubernetes controller `reloader`.
  - If not, for manual steps see https://gitlab.3pc.de/q8r/development-documentation/-/blob/master/kubernetes-related.md#graceful-rolling-deployment-restart for small guide to do it.

> ⚠️: With graceful restart approach if the new version is not built successfully, it won't replace the older version (which will continue to run). In this case, check k9s or Kubernetes Dashboard for logs.

> ℹ️: Killing the process(pod) from Kubernetes will force recreation and may lead to errors during gateway startup - leading to downtime of whole solution.

## Build & Run

> **INFO**: Requires an `.env.local` file in root folder with [required variables](#environment-variables).

- Install dependencies: `yarn`
- Run in Development Mode: `yarn dev` | **In development mode we are reading the environment variables from `.env.local`.**
- Run in Production Mode `yarn start`

## More Info

- [Apollo Gateway Docs](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-gateway)
- [KeyCloak Auth on Apollo Server Tutorial](https://mris.dev/creating-graphql-api-gateway-using-apollo-gateway-keycloak-part-2/)
- [Medium: KeyCloak Apollo Authentication including Directives](https://medium.com/@darahayes/keycloak-authentication-and-authorization-in-graphql-ad0a1685f7da)
- [Apollo Federation Blog - Authentication](https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation)
- [KeyCloak Connect Graphql](https://github.com/aerogear/keycloak-connect-graphql)
- [OAuth2](https://auth0.com/intro-to-iam/what-is-oauth-2)

## Setting Up Your Editor

Linting errors are always visible in your terminal. However, if you want to see linting errors right in your editor you can do so by installing the proper `ESLint` plugin for your editor. Everything else is already set up.

To enable auto-fixing, follow the instructions for your specific editor below:

<details>
<summary>Visual Studio Code</summary>
<br>
Install the following plugins:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

In your `settings.json` file add following lines:

```json
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```

Furthermore, you want to add the [editorconfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) plugin, so you have the same coding style settings as your co-workers.

</details>
<br>
<details>
<summary>Webstorm / PhpStorm</summary>
<br>
ESLint is built into PhpStorm. Make sure to enable it in the preference pane.

- ESLint: **Languages & Frameworks > JavaScript > Code Quality Tools > ESLint**

To enable auto-fix on save you have to add some file watchers. To add a watcher go to **Tools > File Watchers** and click on the `+`.

- Name: ESLint
- File Type: JavaScript
- Scope: _Choose frontend directory and include files recursively_
- Program: PATH/TO/PROJECT/node_modules/.bin/eslint
- Arguments: --fix $FilePath$
- Output paths to refresh: $FilePath$

You can control when the watchers should run under **Advanced Options**.
If you run into troubles with auto-fixing, uncheck the PHPStorm auto-saving under
**Appearance & Behavior > System Settings > Synchronization > Use "safe write"**.

Furthermore you want to add the `editorconfig` plugin, so you have the same coding style settings as your co-workers.<br>
Install the plugin by searching for `editorconfig` in **Plugins > Browse repositories...**.

</details>

## Session Management | Authentication

This gateway is responsible for initiating authentication through [OpenID Connect](https://openid.net/connect/) using the [Resource Password Owner Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/resource-owner-password-flow).

### Requirements

- Identity Provider (IP) e.g. KeyCloak
- Set up a `gateway` **Client** inside the IDP
- Redis Storage

### Authorization Flow | [Resource Owner Password Flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/resource-owner-password-flow)

#### First option: using the *login* mutation

1. User does login through gateway's login mutation `mutation{ login(username: "example-user", password: "example-password){ user { id } }`
2. The Gateway is using the credentials including the IDP's Client ID (`graphql-gateway`) and Client Secret, requesting an AccessToken + RequestToken. (IP Token Endpoint + JWKS Endpoint)
3. If the gateway receives the token successfully, a session is started and stored inside *Redis* and the client application is receiving a **cookie** including the **session id**.
 
After a successful Login, the (signed) cookie is sent in all client requests to the Gateway and **unsigned** to all graphql subgraphs (services)

#### Cookie

- Name: connect.sid
- Value: Session ID

#### Session Storage

- Session Key: `sess:[SESSION_ID]`
- Session Data:

```json
{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVM3J4NjFVaTFrOFNLVGJYSTZJVmYtN3k5R0ZvaVN6Z0s0RlR1UnBkSDIwIn0.eyJleHAiOjE2NjczMTk4OTEsImlhdCI6MTY2NzMxODA5MSwianRpIjoiNzgxODgyN2ItODg0NC00NDk5LWFjNDEtOWVkYjBmMjFmMjVlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5rOHMuM3BjLmRlL2F1dGgvcmVhbG1zLzNwYyIsImF1ZCI6WyJhc3NldC1tYW5hZ2VtZW50Iiwic3RvcnktZWRpdG9yIl0sInN1YiI6ImE1MmE4ODliLTRlYTctNGYzNC1hODkzLTE3MWZhNWU4ZTkyMCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImdyYXBocWwtZ2F0ZXdheSIsInNlc3Npb25fc3RhdGUiOiIyMTI4MWUyNy1lZjM0LTQ1OTgtODU3MS1mMWNkM2QxZDQzMzUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImVkaXRvciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFzc2V0LW1hbmFnZW1lbnQiOnsicm9sZXMiOlsiYWRtaW4iXX0sInN0b3J5LWVkaXRvciI6eyJyb2xlcyI6WyJlZGl0b3IiXX19LCJzY29wZSI6InByb2ZpbGUgY3VzdG9tX3Byb2plY3RfaW5mbyByb2xlcyBlbWFpbCIsInNpZCI6IjIxMjgxZTI3LWVmMzQtNDU5OC04NTcxLWYxY2QzZDFkNDMzNSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcm9qZWN0cyI6WyI2MDJiYWY5NDVhMjk1YTNmNGJhNTU3M2QiLCI1ZjYzODNiNTUyMDExMDc5ZjQyY2ZjY2UiLCI2MDZlZTViZjY3NjlmODNlMjRkYzE2Y2MiLCI1ZjkyYzc4NjQ0YjcxYjIxZTlkZGE3NmQiXSwibmFtZSI6IlNvZXJlbiBSYWV1Y2hsZSIsImdyb3VwcyI6WyIzcGMiLCJzaWVtZW5zIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNyYWV1Y2hsZSIsImdpdmVuX25hbWUiOiJTb2VyZW4iLCJmYW1pbHlfbmFtZSI6IlJhZXVjaGxlIiwiZW1haWwiOiJzcmFldWNobGVAM3BjLmRlIn0.DcE5rz__16tYU2yf7cvnouEMYv09yAEMA040nVaRH8AYsYcUjAU8GhNQWHC0VFd5b1Y4UnCldV0SigXNW5l8Xic3p5LtHqWRyHkxDmxybrKTck7c3cLSHgb3txzMCtF0nzPN6s8Qhv5_UVBHX4a1vpLaRsPNeeSe3sp0gYOg7lsgG34WI49R3ouGJISqAiEWbB-XOVslfRVnht1ISU_RlPUzDQXGQ2LpCjDPNN0TA2_h10VT9svAQfFQbnEEOZaayU0fuwwilOdFsl2HiNWq2m7LoL1NnyIF7yfer6vMBy24f-pMqS0xkvSRS49gDBfEGRA2G7DFcwA5Os0hGpyKfw",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4MGFjYjE0NS1lMjc5LTQ2NDgtOWVhMS1lYjdhNmJlMGY2MmQifQ.eyJleHAiOjE2NjczNjEyOTEsImlhdCI6MTY2NzMxODA5MSwianRpIjoiMGZkODQ3NDktNjg1ZC00MGI3LWE3NzEtYmJhMWI4MjY0ZTA3IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5rOHMuM3BjLmRlL2F1dGgvcmVhbG1zLzNwYyIsImF1ZCI6Imh0dHBzOi8va2V5Y2xvYWsuazhzLjNwYy5kZS9hdXRoL3JlYWxtcy8zcGMiLCJzdWIiOiJhNTJhODg5Yi00ZWE3LTRmMzQtYTg5My0xNzFmYTVlOGU5MjAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoiZ3JhcGhxbC1nYXRld2F5Iiwic2Vzc2lvbl9zdGF0ZSI6IjIxMjgxZTI3LWVmMzQtNDU5OC04NTcxLWYxY2QzZDFkNDMzNSIsInNjb3BlIjoicHJvZmlsZSBjdXN0b21fcHJvamVjdF9pbmZvIHJvbGVzIGVtYWlsIiwic2lkIjoiMjEyODFlMjctZWYzNC00NTk4LTg1NzEtZjFjZDNkMWQ0MzM1In0.vonz-6i_G6LiCjaWGYkNPoNtCHQ_Z0Kgg1MgpGduo4Q",
  "expires": 1667319891900,
  "user": {
    "id": "a52a889b-4ea7-4f34-a893-171fa5e8e920",
    "roles": { 
      "asset-management": "editor",
      "story-editor": "admin"
    },
    "data": {
      ...
    }
  }
}
```
| Name         | Description                                                                                                                                                             | Requirement    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| accessToken  | string. RS256 encrypted JWT Token provided by the Identity Provider short lifetime, e.g. 3 minutes.                                                                     | yes (Gateway)  |
| refreshToken | string. RS256 encrypted JWT Token provided by the Identity Provider long lifetime, e.g. 24 hours.                                                                       | yes (Gateway)  |
| user         | object. user data including identifier and attributes needed by the application.                                                                                        | yes (Services) |
| user.id      | string. unique identifier für the logged in user provided by the identity provider.                                                                                     | yes (Services) |
| user.roles   | key-value map. resource based role definition. <br/>- **key**: string, representing a Identity Provider Client-ID, <br/>- **value**: string, representing the role name | yes (Services) |
| data         | key-value object, storage for services want to store some data e.g. search history                                                                                      | yes (Services) |

#### Second option: using the *authenticate* mutation

1. User does login in the client 
2. User sends encrypted access_token and refresh token to the gateway (rn: Keycloak and BLM IDP are supported) 
`mutation{ authenticate(access_token,
   refresh_token,
   expires_in){ user { id } }`
3. The gateway decrypts the tokens and validates them against the certificate.
4. If they are valid a session is started and stored inside *Redis* and the client application is receiving a **cookie** including the **session id**.

After a successful authenticate mutation, the (signed) cookie is sent in all client requests to the Gateway and **unsigned** to all graphql subgraphs (services)

### Secure cookies

`express-session` implementation relies on a `X-Forwarded-Proto` header.

In case 2 chained proxies are present, where downstream one works via HTTP, `X-Forwarded-Proto` may require explicit 'https' setting.

Related options:
- https://expressjs.com/en/guide/behind-proxies.html
- https://github.com/expressjs/session#cookiesecure
- https://github.com/expressjs/session#proxy

## curl Testing

```sh
GATEWAY_URL=https://gateway.q8r.3pc.de/graphql
curl "$GATEWAY_URL" \
  -H 'content-type: application/json' \
  --data-raw '{"operationName":"Projects","variables":{"first":100,"skip":0},"query":"query Projects($first: Int = 100, $skip: Int = 0) {\n  projects(first: $first, skip: $skip, orderBy: {name: ASC}) {\n    edges {\n      node {\n        id\n        name\n        imageUrl\n        updatedAt\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}' \
  | jq

GATEWAY_URL=https://assets.q8r.3pc.de/api-gateway # testing Nginx reverse proxy
curl --request POST \
  --header 'content-type: application/json' \
  --url "$GATEWAY_URL" \
  --data '{"query":"query { __typename }"}' \
  | jq
```
