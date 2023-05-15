export const BoxRadioGroupProps = {
  value: "1",
  options: [
    {
      value: "1",
      label: "Yes man",
    },
    {
      value: "2",
      label: "Okay!",
    },
  ],
  onChange: (v: string) => {
    console.log(v);
  },
};
