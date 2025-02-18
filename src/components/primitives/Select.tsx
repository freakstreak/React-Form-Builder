import {
  FormHelperText,
  MenuItemProps,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";

type CustomSelectProps<Value = unknown> = MuiSelectProps<Value> & {
  helperText?: string;
};

function Select<Value = unknown>({
  helperText,
  ...props
}: CustomSelectProps<Value>) {
  return (
    <>
      <MuiSelect {...props}>{props.children}</MuiSelect>
      {helperText && (
        <FormHelperText className="!mx-4">{helperText}</FormHelperText>
      )}
    </>
  );
}

function SelectOption({ ...props }: MenuItemProps) {
  return <MuiMenuItem {...props}>{props.children}</MuiMenuItem>;
}

export { Select, SelectOption };
