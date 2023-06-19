# Github Repo Explorer

Mini project using React, Typescript and TanStack Query.
 
### Search github username and see their repositories.
- Fill the input box and click Search to search username
- Click `arrow-down` icon to expand and see repositories of certain user
- Open the repository by clicking the repository card.

## Preview
This project is deployed to firebase hosting: https://github-repo-explore.web.app

## How to Run
- clone the project and run `npm install`
- create `.env.local` file in root project directory, `.env.local` is not pushed in this repository.
- add `GITHUB_SECRET` variable in `.env.local` and use your github secret token for credentials.
- run `npm run dev` to start development server
- run `npm test` to run unit tests

## Build & Deploy
- run `npm run build` to build project for production
- deploy to firebase: run `firebase deploy`. Or you can use any deployment.