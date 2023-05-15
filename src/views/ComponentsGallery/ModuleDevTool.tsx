import { Button, Form, Input, Modal, Select, Space, Typography } from "antd";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import utils from "@/utils";
import { filterOptionOnSearch, parseInput, parseMockData } from "./utils";
import { useControlModal } from "@/hooks/useControlModal";
import { useEventListener } from "ahooks";

const modules = import.meta.glob([
  "@/components/**/**.tsx",
  "@/features/**/**.tsx",
  "!@/**/**mock**.tsx",
  "!@/**/**mock**.ts",
]);

const mockModules = import.meta.glob(["@/**/**mock**.tsx", "@/**/**mock**.ts"]);
const options = Object.keys(modules).map((key) => ({ label: key, value: key }));
options.unshift({ label: "Reset", value: "" });
export const ModuleDevTool = () => {
  const [currentModulePath, setCurrentModulePath] = useState<string>();
  return (
    <div>
      <Form.Item label={"Select your module"}>
        <Select
          placeholder={"Support search"}
          showSearch
          filterOption={(input, option) => {
            return filterOptionOnSearch(
              input.toLowerCase(),
              ((option?.label as string) ?? "").toLowerCase()
            );
          }}
          options={options as any}
          onChange={(value) => {
            if (value) {
              setCurrentModulePath(value);
            } else {
              setCurrentModulePath(undefined);
            }
          }}
          value={currentModulePath}
        />
      </Form.Item>
      <div>
        {currentModulePath && (
          <CurrentModule
            path={currentModulePath}
            moduleImport={modules[currentModulePath]}
          />
        )}
      </div>
    </div>
  );
};

const CurrentModule = ({
  path,
  moduleImport,
}: {
  path: string;
  moduleImport: any;
}) => {
  const [module, setModule] = useState<any>();
  const [selectName, setSelectName] = useState<string>();
  const [mockProps, setMockProps] = useState<any>();
  const options = useMemo(() => {
    if (!module) {
      return [];
    }
    const keys = Object.keys(module).filter((i) => !i.includes("Modal"));
    return keys.map((key) => ({ label: key, value: key }));
  }, [module]);
  useEffect(() => {
    moduleImport().then((content: any) => {
      if (content) {
        setModule(content);
      }
    });
  }, [moduleImport]);
  const moduleElement = useMemo(() => {
    if (!module || !selectName || !module[selectName]) {
      return <div>Not find element</div>;
    }

    return createElement(module[selectName], mockProps);
  }, [module, selectName, mockProps]);

  useEffect(() => {
    if (module) {
      const exportName = Object.keys(module).filter(
        (i) => !i.includes("Modal")
      );
      if (exportName.includes("default")) {
        setSelectName("default");
      } else {
        setSelectName(exportName[0]);
      }
    }
  }, [module]);

  return (
    <div>
      <Space size={24}>
        <Form.Item label={"Current export name"}>
          <Select
            style={{ width: 300 }}
            options={options}
            onChange={(value) => {
              setSelectName(value);
            }}
            value={selectName}
          />
        </Form.Item>
        <Form.Item>
          <MockTrigger
            modulePath={path}
            currentExportName={selectName}
            onTriggerMock={(props) => {
              setMockProps(props);
            }}
          />
        </Form.Item>
      </Space>
      <div className={"flex"}>
        <div className="flex-grow">{moduleElement}</div>
        <div className={"flex-shrink-0 flex"}>
          <CustomComponentPropsEdit
            onChangeProps={(props) => {
              setMockProps(props);
            }}
          />
          <MockIframeEditor />
        </div>
      </div>
    </div>
  );
};

const MockTrigger = ({
  modulePath,
  currentExportName,
  onTriggerMock,
}: {
  modulePath: string;
  currentExportName?: string;
  onTriggerMock?: (mockData: any) => void;
}) => {
  const [mockModule, setMockModule] = useState<any>();
  useEffect(() => {
    const splitPath = modulePath.split("/");
    splitPath.pop();
    const folderPath = splitPath.join("/");
    for (const [key, value] of Object.entries(mockModules)) {
      if (key.includes(folderPath)) {
        value().then((content) => {
          setMockModule(content);
        });
        break;
      }
    }
  }, [modulePath]);
  const mockProps = useMemo(() => {
    if (currentExportName && mockModule) {
      const ModuleName = (modulePath.split("/").pop() ?? "").replace(
        ".tsx",
        ""
      );
      const mockIndex =
        currentExportName === "default"
          ? `${ModuleName}${utils.string.capitalizeFirstLetter("default")}Props`
          : `${currentExportName}Props`;
      const mockProps = mockModule[mockIndex];
      if (typeof mockProps === "object") {
        return mockProps;
      }
    }
  }, [currentExportName, mockModule, modulePath]);
  const handlePass = () => {
    onTriggerMock?.(mockProps);
  };
  return (
    <Button type={"primary"} disabled={!mockProps} onClick={handlePass}>
      pass props
    </Button>
  );
};

const CustomComponentPropsEdit = ({
  onChangeProps,
}: {
  onChangeProps?: (data: any) => void;
}) => {
  const [value, setValue] = useState<string>();
  return (
    <div className={"pl-6"}>
      <div className={"mb-4"}>
        <span>Freedom props editor!</span>
        <br />
        <span className={"text-color-tertiary"}>
          format: {`{propName}|{dataType}={value}`}
        </span>
      </div>
      <Input.TextArea
        value={value}
        placeholder={"have a try"}
        style={{ width: 300 }}
        rows={5}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <div className="mt-4">
        <Button
          onClick={() => {
            if (value) {
              if (value.startsWith("{")) {
                onChangeProps?.(parseMockData(value));
              } else {
                onChangeProps?.(parseInput(value));
              }
            } else {
              onChangeProps?.(undefined);
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const MockIframeEditor = () => {
  const modal = useControlModal();

  return (
    <div className={"pl-6 w-[250px]"}>
      <Space size={12} direction={"vertical"}>
        <div>Mock.js data</div>
        <div className={"text-color-tertiary"}>
          open the online editor, after finishing work, copy the output data and
          paste it into the Textarea!
        </div>
        <Typography.Link href={"https://github.com/nuysoft/Mock/wiki"}>
          Mock.js doc
        </Typography.Link>
        <Typography.Link href={"http://mockjs.com/examples.html"}>
          Mock.js examples
        </Typography.Link>
        <Typography.Link onClick={modal.show}>Online editor</Typography.Link>
      </Space>
      <Modal title={"Mock editor"} {...modal} footer={null} width={840}>
        <IframeWrapper />
      </Modal>
    </div>
  );
};

const IframeWrapper = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  useEventListener(
    "load",
    () => {
      setLoading(false);
    },
    { target: iframeRef }
  );
  return (
    <div>
      {loading && <div>loading...</div>}
      <iframe
        src={"http://mockjs.com/0.1/editor.html#help"}
        width={800}
        height={600}
        loading={"lazy"}
        ref={iframeRef}
      />
    </div>
  );
};
