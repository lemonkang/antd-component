import { Form } from "antd";
import { InputMoney } from "@components/Input/InputMoney";
import { requiredRule } from "@/antd-rules/general-rules";

const FormItem = Form.Item;

export function Amount() {
  const form = Form.useFormInstance();
  return (
    <FormItem name={"amount"} label={"Amount(INR)"} rules={[requiredRule]}>
      <div className={"w-[212px]"}>
        <InputMoney onChange={(e) => {form.setFieldsValue({ amount: e });}} />
      </div>
    </FormItem>
  );
}