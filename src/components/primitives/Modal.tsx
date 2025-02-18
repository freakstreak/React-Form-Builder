import { DialogProps, Dialog as MuiDialog } from "@mui/material";

const Modal = ({ ...props }: DialogProps) => {
  return (
    <MuiDialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "10px",
          border: "none",
        },
      }}
      {...props}
    >
      {props.children}
    </MuiDialog>
  );
};

export default Modal;
