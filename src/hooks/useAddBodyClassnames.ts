import { useMount } from "ahooks";
const addCls = (cls: string) => {
      if (!document.body.classList.contains(cls)) {
        document.body.classList.add(cls);
      }
    }
const useAddBodyClassnames = (classnames: string[]) => {
  useMount(() => {
    classnames.forEach(addCls)
  })
}

export default useAddBodyClassnames
