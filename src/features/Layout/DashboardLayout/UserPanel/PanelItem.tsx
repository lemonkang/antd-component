import IconFont from "@components/IconFont/IconFont";

export function PanelItem(props: {
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <div className={"flex items-center"} onClick={props.onClick}>
      <IconFont type={props.icon} className={"text-lg mr-2"} />

      <span>{props.label}</span>
    </div>
  );
}
