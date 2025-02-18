import { IconButton as MuiIconButton, IconButtonProps } from "@mui/material";

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <MuiIconButton className={props.disabled ? "opacity-50" : ""} {...props}>
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
