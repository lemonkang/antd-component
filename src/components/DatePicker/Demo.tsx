import { DatePicker, RangePicker } from "@components/DatePicker/DatePicker";

function Demo() {
  return (
    <div className={"grid grid-cols-3 gap-6"}>
      <DatePicker />
      <DatePicker disabled />
      <DatePicker status={"error"} />
      <RangePicker />
      <RangePicker disabled />
      <RangePicker status={"error"} />
    </div>
  );
}

export default Demo;
