import { useState } from "react";

export const useControlModal = () => {
  const [open, setOpen] = useState(false);
  return {
    open,
    onCancel: () => {
      setOpen(false);
    },
    show: () => {
      setOpen(true);
    },
  };
};
