## rbac tools documents

**Note: This document describes the general usage of rbac-tools. This project can directly use the customized method in `usePermission` hook.**

- testPermission

a function that tests whether a role has permission for a module

in this project we can find rules in `rbac/index`

`function testPermission(role: Role): (rules: (string | string[])) => boolean`

```jsx
// useage
const [role] = useAtom(atoms.user.role)
const rules = 'kAccount.companyInfo'
const isPermission = testPermission(role)(rules);
```

- withPermission 

a HOC rendered conditionally according to rbac rules

`function withPermission(role: Role): (rules: string) => <P extends Record<string, unknown>>(Component: (ComponentType<P> | ReactNode)) => FC<P>`

```jsx
// useage
// example1
const [role] = useAtom(atoms.user.role)
const rules = 'kAccount.companyInfo'
const CustomComponent = <div>hello</div>
const WrapComponent = withPermission(role)(rules)(CustomComponent)
return (
  <div>
    <div>this is a test</div>
    <WrapComponent onClick={() => {console.log('nice')}} />
  </div>
)

// example2
import Button from "./Button";

const CustomComponent = Button
const rule = 'kAccount.companyInfo'
const WrapComponent = withPermission(rule)(CustomComponent)
return (
  <div>
    <div>this is a test</div>
    <WrapComponent type={'primary'}>button</WrapComponent>
  </div>
)
```