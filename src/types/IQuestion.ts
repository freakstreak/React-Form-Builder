export interface IQuestion {
  id: string;
  formLabel: string;
  inputType: InputTypeEnum;
  options?: ISelectOption[];
  max?: number;
  min?: number;
  required?: boolean;
  hidden?: boolean;
  multiSelect?: boolean;
  numberType?: string;
  helperText?: string;
  isParagraph?: boolean;
  order: number;
  newQuestion?: boolean;
}

export enum InputTypeEnum {
  Text = "text",
  Select = "select",
  Number = "number",
  Email = "email",
  Password = "password",
  TextArea = "textarea",
}

export interface ISelectOption {
  label: string;
  value: string;
}
