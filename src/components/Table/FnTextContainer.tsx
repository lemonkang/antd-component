import type { ReactNode } from "react";
import Styles from "@components/Table/table.module.scss";
import { Divider } from "antd";

type FnTexts = {
  item: ReactNode;
  onClick: () => void | Promise<void>;
};

function FnTextContainer({ fnTexts }: { fnTexts: FnTexts[] }) {
  return (
    <div className={Styles.fnText}>
      {fnTexts?.map((item) => (
        <span key={Math.random().toString()}>
          <span
            onClick={() => {
              item.onClick();
            }}
            className={"cursor-pointer text-primary"}
          >
            {item.item}
          </span>
          <Divider type={"vertical"} />
        </span>
      ))}
    </div>
  );
}

export default FnTextContainer;
