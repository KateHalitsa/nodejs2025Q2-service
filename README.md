# Home Library Service
## Docker(Part 2)
To start Docker I used (also make sure that nothing):
```
docker-compose build
docker-compose up
```
then you can run tests

## DockerHub
My username and image names: ekaterinahalitsa/nodejs2025q2-service-backend, ekaterinahalitsa/nodejs2025q2-service-db.
Script to run it:
```
docker pull ekaterinahalitsa/nodejs2025q2-service-backend
docker run ekaterinahalitsa/nodejs2025q2-service-backend
```
```
docker pull ekaterinahalitsa/nodejs2025q2-service-db
docker run ekaterinahalitsa/nodejs2025q2-service-db
```
## (Part 1)
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
npm run test -- ./test/albums.e2e.spec.ts
npm run test -- ./test/users.e2e.spec.ts
npm run test -- ./test/artists.e2e.spec.ts
npm run test -- ./test/favorites.e2e.spec.ts
npm run test -- ./test/tracks.e2e.spec.ts

```
If tests don't run try (Unix/Linux (bash, zsh):
```
rm -rf node_modules package-lock.json 
npm cache clean --force
npm i
```
Or
```
rm -Recurse -Force .\node_modules
rm -Force .\package-lock.json
npm cache clean --force
npm i

```

To run all test with authorization (no implementation)

```
npm run test:auth
```

To run only specific test suite with authorization (no implementation)

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
