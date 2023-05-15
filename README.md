# Karbon card fe project introduction

node version: v19.7.0
library management program: pnpm
## Category management

```shell
src
├── App.tsx
├── apis
├── assets
├── components
├── hooks
├── main.tsx
├── views
├── router
├── style
├── utils
└── vite-env.d.ts
```
Explain：
- `apis` : manage all apis
- `assets` : storing all outer resource, like images / video
- `components` : common components, basically the UI components
- `hooks` : global react hooks like useCountdown / useTable
- `views` : storing main codes, generally 1 folder means 1 page
- `route` : manage the route config & route wrapper
- `style` : manage global css, variables, reset css
- `utils` : manage the global utils functions, like form validation, data transfer, like lodash 
- `features` : for common usage components, an easy way to judge whether the component can be defined in this folder: run it without authorized status for user.

## mock
import `vite-plugin-mock-server`, development before backend apis are not ready!

details [doc](https://vite-plugin-mock-dev-server.netlify.app/guide/introduce)
## Others
### The reason App render twice in development
> React StrictMode calls all Effects twice to make sure their cleanup/unmount handlers work as intended. You may need to change your effects accordingly, even if they have an empty dependency list and would normally not unmount before the site is closed.

> Note, this only happens in Strict + development mode. In a production build, effects will only be called once and when their dependencies change.

https://stackoverflow.com/questions/72489140/react-18-strict-mode-causing-component-to-render-twice


## Install libraries references

1. https://tailwindcss.com/docs/guides/vite
