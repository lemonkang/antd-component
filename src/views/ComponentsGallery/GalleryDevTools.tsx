import { FloatButton, Modal } from "antd";
import { useState } from "react";
import { ModuleDevTool } from "@/views/ComponentsGallery/ModuleDevTool";
import ComponentsGallery from "@/views/ComponentsGallery/index";
import IconFont from "@components/IconFont/IconFont";
export const GalleryDevTools = () => {
  if (!import.meta.env.DEV) {
    return null;
  }
  return <GalleryPanel />;
};

const GalleryPanel = () => {
  const [open, setOpen] = useState(false);
  const [moduleDev, setModuleDev] = useState(false);
  return (
    <>
      <FloatButton.Group shape={"square"}>
        <FloatButton
          onClick={() => {
            setOpen(true);
          }}
          icon={<IconFont type={"icon-list-layout"} />}
        />
        <FloatButton
          onClick={() => {
            setModuleDev(true);
          }}
          icon={<IconFont type={"icon-moban"} />}
        />
        <FloatButton
          icon={<IconFont type={"icon-card-layout"} />}
          onClick={() => {
            if (window.location.href.includes("/dev")) {
              window.location.href = "/sign-in";
            } else {
              window.location.href = "/dev/module-panel";
            }
          }}
        />
      </FloatButton.Group>
      <Modal
        title={"Gallery"}
        onCancel={() => {
          setOpen(false);
        }}
        open={open}
        destroyOnClose
        width={"80vw"}
        footer={null}
        maskClosable={false}
      >
        <ComponentsGallery />
      </Modal>
      <Modal
        title={"Module DEV"}
        onCancel={() => {
          setModuleDev(false);
        }}
        open={moduleDev}
        destroyOnClose
        width={"80vw"}
        footer={null}
        maskClosable={false}
      >
        <ModuleDevTool />
      </Modal>
    </>
  );
};
