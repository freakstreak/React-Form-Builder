import { FormControl as MuiFormControl, FormControlProps } from "@mui/material";

const FormControl = ({ ...props }: FormControlProps) => {
  return <MuiFormControl {...props}>{props.children}</MuiFormControl>;
};

export default FormControl;
