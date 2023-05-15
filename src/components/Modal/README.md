# The using guide of Modal

首先介绍最常规的使用方式，项目已经封装了`useControlModal` hook。

```typescript jsx
import { useControlModal } from "./useControlModal";


const Test = () => {
  const modal = useControlModal()
  return <Modal {...modal} />
}
```

但是更推荐结合`nice-react-modal`一起使用。[github repository](https://github.com/eBay/nice-modal-react)

```typescript jsx
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

const MyModal = NiceModal.create(() => {
  const modal = useModal()
  return <Modal {...antdModalV5(modal)} />
})

// useage
function Demo() {
  return (<button type="submit" onClick={() => {
    NiceModal.show(MyModal)
  }}>submit</button>)
}
```

对于公用的modal，例如 `ResultModal` or `OTPModal`，可以将注册在NiceModalProvider中，使用起来更加方便。

```typescript jsx
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { Modal } from "antd";

enum FunctionModal {
  ResultModal = 'result-modal'
}
const ResultModal = NiceModal.create(({content}: {content?: string}) => {
  const modal = useModal()
  return <Modal {...antdModalV5(modal)} />
})

NiceModal.register(FunctionModal.ResultModal, ResultModal)

function Demo() {
  const modal = useModal(FunctionModal.ResultModal)
  const showModal = () => {
    modal.show({content: 'hi'})
  }
  return (<div onClick={showModal}>hi</div>)
}
```