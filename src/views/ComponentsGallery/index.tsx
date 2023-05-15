import Style from "./gallery.module.scss";
import classNames from "classnames";
import { useMemo, useState } from "react";
import type { ComponentViewData } from "@/views/ComponentsGallery/ComponentView";
import { ComponentView } from "@/views/ComponentsGallery/ComponentView";

const modules = import.meta.glob(["@/components/**/Demo.tsx"]);
const readmeDocs = import.meta.glob("@/components/**/README.md", {
  as: "raw",
  eager: true,
});

const componentsModules: Record<string, ComponentViewData> = {};
const componentNameReg = /components\/([A-Z]\w+)\//;
const findComponentName = (path: string): string | undefined => {
  const match = path.match(componentNameReg);
  return match?.[1];
};
const findReadme = (componentName: string) => {
  for (const path in readmeDocs) {
    if (new RegExp(`/${componentName}/README.md`).test(path)) {
      return readmeDocs[path];
    }
  }
  return "# Please add README.md";
};

Object.keys(modules).reduce((moduleObj, path) => {
  const componentName = findComponentName(path);
  if (componentName) {
    moduleObj[componentName] = {
      module: modules[path],
      readme: findReadme(componentName),
      path: path.replace(/\/Demo.tsx$/, ""),
    };
  }
  return moduleObj;
}, componentsModules);

function ComponentsGallery() {
  const [currentComponent, setCurrentComponent] = useState<string>();
  const currentModule = useMemo(() => {
    return currentComponent ? componentsModules[currentComponent] : undefined;
  }, [currentComponent]);
  return (
    <div className={Style.gallery}>
      <div>
        <ul>
          {Object.keys(componentsModules).map((name) => {
            return (
              <SideItem
                key={name}
                name={name}
                active={Boolean(name === currentComponent)}
                onClick={() => {
                  setCurrentComponent(name);
                }}
              />
            );
          })}
        </ul>
      </div>
      <div>{currentModule && <ComponentView {...currentModule} />}</div>
    </div>
  );
}

export default ComponentsGallery;

const commonActiveCls = "bg-primary text-white".split(/\s+/).filter(Boolean);
const SideItem = ({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick?: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className={classNames(
        "h-[45px] flex items-center transition-colors cursor-pointer rounded-lg px-3 mb-3 last:mb-0",
        active && commonActiveCls,
        "hover:opacity-80",
        commonActiveCls.map((cls) => `hover:${cls}`)
      )}
    >
      <span className={"text-xl font-bold"}>{name}</span>
    </li>
  );
};
