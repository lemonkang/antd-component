import { Select } from "@components/Select/Select";

function Demo() {
  return (
    <div className={"grid grid-cols-3 gap-6"}>
      <Select />
      <Select disabled />
      <Select status={"error"} />
      <Select open />
      <Select
        open
        options={[
          { label: "yes", value: "yes" },
          { label: "no", value: "no" },
        ]}
      />
    </div>
  );
}

export default Demo;
