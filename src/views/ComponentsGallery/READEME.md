# 说明文档

## ComponentsGallery

自动抓取 `@/components` 目录下面的通用组件文件夹，如果里面包含`Demo.tsx`和 `README.md`， 则会被视为可以在 gallery
中展示的组件。自动渲染里面`markdown`内容和使用 `React.createElement` 渲染 Demo 组件。

> 请注意：Demo 组件 一定要有 export default

## Component dev tool

用于组件开发的调试，能够实时渲染目标组件，并支持三种传递 props 方式：

1. **local mock file** 在目标文件所在的目录下，创建一个`mock.XXX.tsx|ts` 文件，如果你的测试组件名称为 `Test`，那么就导出一个`TestProps`, 如果测试的是 `export default`组件，那么就是`${文件名}DefaultProps`

```typescript jsx
import { ComponentProps } from "react";

export const TestProps: ComponentProps<typeof Test> = {
  name: 1,
};

export const TestDefaultProps = {
  name: 2,
};
```

2. **custom input** 在侧边的输入中按照相应的格式输入，即可得到对应的 props

```typescript jsx
/**
 * textarea input content:
 * name=1
 * age|number=18
 * isMale|boolean=true
 * onClick|function
 */

// parsed props
const props = {
  name: "1",
  age: 18,
  isMale: true,
  onClick: (...args) => console.log(...args),
};
```

3. **online mock data** 通过在`textarea`中粘贴mock data，得到对应的props

> 之所以类型处理只做了 number / bool 的处理的原因是，希望大家能够尽量的拆分组件，传递组件props时，也尽量使用 basic type，并尽量少的传递props
