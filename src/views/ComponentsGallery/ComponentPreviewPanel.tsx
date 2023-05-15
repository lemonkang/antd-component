import { createElement, Suspense, useEffect, useMemo, useState } from "react";
import { Form, Select } from "antd";

export const ComponentPreviewPanel = () => {
  const [modules, setModules] = useState<any>({});
  const selectOptions = useMemo<Array<{ label: string; value: string }>>(() => {
    const keys = Object.keys(modules);
    return keys.map((key) => ({ value: key, label: key }));
  }, [modules]);
  useEffect(() => {
    const modules = import.meta.glob([
      "@/components/**/**.tsx",
      "@/features/**/**.tsx",
    ]);
    setModules(modules);
  }, []);
  const [currentModule, setCurrentModule] = useState<any>();

  return (
    <div>
      <Form.Item label={"Select the component"}>
        <Select
          options={selectOptions}
          filterOption={(input, option) => {
            return (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          showSearch
          onChange={async (value) => {
            const module = modules[value];
            const content = await module();
            setCurrentModule(content);
          }}
        />
      </Form.Item>
      {currentModule && <RenderComponent module={currentModule} />}
    </div>
  );
};

const RenderComponent = ({ module }: { module: any }) => {
  if (!module.default) {
    return <div>no default entry</div>;
  }
  return createElement(module.default);
};
