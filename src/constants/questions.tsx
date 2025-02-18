import { ISelectOption } from "../types/IQuestion";

export const questionTypes: ISelectOption[] = [
  { label: "Text", value: "text" },
  { label: "Email", value: "email" },
  { label: "Password", value: "password" },
  { label: "Number", value: "number" },
  { label: "Selection", value: "select" },
  { label: "Textarea", value: "textarea" },
];
