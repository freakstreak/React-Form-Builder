import { FormControlLabel } from "@mui/material";
import React from "react";
import CheckBox from "../primitives/CheckBox";

const CheckBoxControl = ({
  label,
  checked,
  name,
  onChange,
}: {
  label: string;
  checked?: boolean;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <FormControlLabel
      control={<CheckBox name={name} checked={checked} onChange={onChange} />}
      label={label}
    />
  );
};

export default CheckBoxControl;
