import utils from "@/utils";
import { Button } from "antd";

export const BatchApprove = ({
  num,
  totalAmount,
  onApprove,
  onDecline,
}: {
  num: number;
  totalAmount: number;
  onApprove?: () => void;
  onDecline?: () => void;
}) => {
  return (
    <div className={"py-4 flex items-center"}>
      <p className={"mr-4 text-color"}>
        {`${num} transactions selected with total amount of ${utils.currency.format(
          totalAmount,
          {
            unit: true,
          }
        )}`}
      </p>
      <Button className={"w-[80px] mr-2 px-0"} onClick={onApprove}>
        Approve
      </Button>
      <Button className={"w-[80px] px-0"} onClick={onDecline}>
        Decline
      </Button>
    </div>
  );
};
