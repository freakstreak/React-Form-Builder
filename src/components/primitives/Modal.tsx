import { DialogProps, DialogTitle, Dialog as MuiDialog } from "@mui/material";
import Typography from "./Typography";
import IconButton from "./IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
