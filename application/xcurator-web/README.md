# xCurator-web

## Table of Contents

- [xCurator](#xcurator)
    - [Table of Contents](#table-of-contents)
    - [Requirements](#requirements)
    - [Available Scripts](#available-scripts)
        - [`yarn dev` or `npm run dev`](#yarn-dev-or-npm-run-dev)
        - [`yarn build` or `npm run build`](#yarn-build-or-npm-run-build)
        - [More Commands](#more-commands)
    - [Development](#development)
    - [Releases](#releases)

## Requirements

**You’ll need to have Node >= 14.0.0 on your local development machine**.<br>
If needed install NodeJS from their [website](https://nodejs.org/en/).

You can use `npm` if you like, but `yarn` would save a lot time here.<br>
**So make sure to have yarn installed.**

Further reading on installing `yarn` at [Yarn Installation Guide](https://yarnpkg.com/en/docs/install)

```bash
$ node -v
```

To see if Node is installed, type the above command on your terminal. If Node is installed properly you should see a version number.

```bash
$ yarn --version
# or
$ npm -v
```

To see if yarn (or npm) is installed, type the above command on your terminal. If yarn (or npm) is installed properly you should see a version number.

## Available Scripts

### `yarn dev` or `npm run dev`

Runs the app in development mode.<br>
Open http://localhost:1234/ to view it in the browser.<br>

The page will automatically reload if you make changes to the code. You will see any lint errors in the console.

The variables defined in `.envs` need to be defined for the application to work properly.

### `yarn build` or `npm run build`

Builds the app for production to the `.next` folder. It generates an optimized version of your application for production.<br>

HTML, CSS, and JavaScript files are created based on your pages.

The build is minified and the filenames include the hashes. Your app is now ready to be deployed.


### More Commands

- `yarn start` or `npm run start`: Run your `.next` folder on a static server.
- `yarn lint` or `npm run lint`: Run ESLint for the files.
- `yarn clean-install` or `npm run clean-install`: Makes a clean install of all your dependencies.

## Development

This project needs to know with which client it is running, in order to be able to make authentication requests correspondingly.

For AP, the frontend will try to authenticate against Keycloak and will talk to the gateway in the correct. In this way we guarantee that the frontend and the gateway are in sync.

This is done by setting `NEXT_PUBLIC_HOST` in a `.envs` file, which will be then exposed when running `yarn dev` and injected at runtime. 

We used this workflow to be able to work with the strategy of build once, deploy everywhere. 

