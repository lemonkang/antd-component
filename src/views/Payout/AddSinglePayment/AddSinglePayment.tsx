import { PageHeader } from "@/features/PageHeader/PageHeader";
import Style from "./style.module.scss";
import { Form, Input } from "antd";
import { requiredRule } from "@/antd-rules/general-rules";
import { SelectCard } from "@/views/Payout/AddSinglePayment/components/select-card/SelectCard";
import { SelectBeneficiary } from "@/views/Payout/AddSinglePayment/components/select-beneficiary/SelectBeneficiary";
import { SelectChecker } from "@/views/Payout/AddSinglePayment/components/select-checker/SelectChecker";
import { Amount } from "@/views/Payout/AddSinglePayment/components/amount/Amount";
import { SelectPaymentCategory } from "@/views/Payout/AddSinglePayment/components/select-payment-category/SelectPaymentCategory";
import { PaymentMethod } from "@/views/Payout/AddSinglePayment/components/payment-method/PaymentMethod";
import Button from "@components/Button/Button";

const FormItem = Form.Item;

export function AddSinglePayment() {
  const [form] = Form.useForm()

  const breadItems = [
    {
      title: "Vendor payment"
    },
    {
      title: "Payment",
      href: ""
    },
    {
      title: "Add payment"
    }
  ];

  const handleSubmit = () => {
    const formValues = form.getFieldsValue()
    console.log('formValues', formValues);
  };

  return <div className={"px-8 py-6"}>
    <PageHeader
      breadItems={breadItems}
      className={"mb-6"}
    />
    <div className={"ml-28"}>
      <Form
        form={form}
        colon={false}
        className={Style.horizontalForm}
        onFinish={handleSubmit}
      >
        <FormItem name={"payFromCard"} label={"Pay from"} rules={[requiredRule]}>
          <SelectCard />
        </FormItem>
        <FormItem name={"beneficiary"} label={"Pay to"} rules={[requiredRule]} className={"max-w-[554px]"}>
          <SelectBeneficiary />
        </FormItem>
        <Amount/>
        <FormItem name={"method"} label={"Preferred payment method"} rules={[requiredRule]}>
          <PaymentMethod />
        </FormItem>
        <FormItem name={"checker"} label={"Checker"} className={"max-w-[554px]"}>
          <SelectChecker />
        </FormItem>
        <FormItem name={"paymentCategory"} label={"Payment for"} className={"max-w-[554px]"}>
          <SelectPaymentCategory/>
        </FormItem>
        <FormItem name={"description"} label={"Description"} className={"max-w-[554px]"}>
          <Input.TextArea placeholder={"Input description"} maxLength={120} autoSize={{ minRows: 4 }} />
        </FormItem>
        <Button type={"primary"} htmlType={"submit"} className={"ml-[200px]"}>Submit</Button>
      </Form>
    </div>
  </div>;
}