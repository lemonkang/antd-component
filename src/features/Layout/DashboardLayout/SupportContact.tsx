import { Popover } from "antd";
import IconFont from "@components/IconFont/IconFont";

export const SupportContact = () => {
  return (
    <Popover
      content={
        <ul>
          {ContactList.map((props, index) => (
            <Item {...props} key={index} />
          ))}
        </ul>
      }
      trigger={"click"}
      arrow={false}
    >
      <span className={"cursor-pointer hover:opacity-80 transition-colors"}>
        Support contact
      </span>
    </Popover>
  );
};

const ContactList = [
  {
    icon: "icon-email-outline",
    label: "Email:",
    value: "support@karboncard.com",
  },
  {
    icon: "icon-smart-phone",
    label: "Toll-free number:",
    value: "18003098470",
  },
  {
    icon: "icon-whatsapp",
    label: "WhatsApp:",
    value: "+91 8287569687",
  },
];
const Item = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  return (
    <li className={"px-4 py-1 flex"}>
      <div className={"mr-2"}>
        <IconFont type={icon} className={"text-lg text-color-tertiary"} />
      </div>
      <div>
        <div className={"text-color-tertiary"}>{label}</div>
        <div>{value}</div>
      </div>
    </li>
  );
};
