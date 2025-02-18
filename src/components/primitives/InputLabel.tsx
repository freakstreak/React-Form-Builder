import { InputLabelProps, InputLabel as MuiInputLabel } from "@mui/material";

const InputLabel = ({ ...props }: InputLabelProps) => {
  return <MuiInputLabel {...props}>{props.children}</MuiInputLabel>;
};

export default InputLabel;
