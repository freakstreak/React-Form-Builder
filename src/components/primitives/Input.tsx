import { TextField, TextFieldProps } from "@mui/material";

const Input = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      sx={{
        "& input[type=number]": {
          MozAppearance: "textfield",
          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        },
      }}
      {...props}
      className={"" + props?.className ? props.className : ""}
    />
  );
};

export default Input;
