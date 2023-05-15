# Update guide

[Install guide of pnpm](https://pnpm.io/installation#using-corepack)
1. install nvm if it is not be installed in your computer
2. `nvm install --lts && nvm use --lts` (we use node v18.14.2 lts currently)
3. `corepack enable`
4. `corepack prepare pnpm@latest --activate`
5. remove `yarn.lock.json` && `package.lock.json` in project
6. remove `node_modules`
7. execute `pnpm install`