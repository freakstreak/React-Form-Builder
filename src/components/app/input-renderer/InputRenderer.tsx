import { FormHelperText } from "@mui/material";
import { InputTypeEnum, IQuestion } from "../../../types/IQuestion";
import FormControl from "../../primitives/FormControl";
import Input from "../../primitives/Input";
import InputLabel from "../../primitives/InputLabel";
import { Select, SelectOption } from "../../primitives/Select";

interface IInputRenderer {
  question: IQuestion;
  formData: any;
  handleChange: (key: string, value: string) => void;
  errors?: any;
}
const InputRenderer = ({
  question,
  formData,
  handleChange,
  errors,
}: IInputRenderer) => {
  if (question.hidden) {
    return (
      <>
        <FormHelperText className="!text-red-600">
          {errors?.[question.id]}
        </FormHelperText>
      </>
    );
  }
  switch (question.inputType) {
    case InputTypeEnum.Text:
      return (
        <Input
          type={question.hidden ? "hidden" : "text"}
          label={question.formLabel}
          helperText={
            errors?.[question.id] ? errors?.[question.id] : question.helperText
          }
          hidden={question.hidden}
          name={question.id}
          error={errors?.[question.id] ? true : false}
          value={formData[question.id] || ""}
          onChange={(e) => handleChange(question.id, e.target.value)}
          multiline={question.isParagraph}
          rows={question.isParagraph ? 4 : 1}
        />
      );
    case InputTypeEnum.Number:
      return (
        <Input
          type={question.hidden ? "hidden" : "number"}
          label={question.formLabel}
          helperText={
            errors?.[question.id] ? errors?.[question.id] : question.helperText
          }
          error={errors?.[question.id] ? true : false}
          name={question.id}
          value={formData[question.id] || ""}
          onChange={(e) => handleChange(question.id, e.target.value)}
        />
      );
    case InputTypeEnum.Select:
      return (
        <FormControl className="w-full">
          {question.formLabel && (
            <InputLabel id={question.id}>{question.formLabel}</InputLabel>
          )}
          <Select
            className="w-full"
            value={formData[question.id] ?? []}
            labelId={question.id}
            label={question.formLabel}
            helperText={
              errors?.[question.id]
                ? errors?.[question.id]
                : question.helperText
            }
            error={errors?.[question.id] ? true : false}
            name={question.id}
            multiple={question.multiSelect}
            onChange={(e) => {
              handleChange(question.id, e.target.value);
            }}
          >
            {question.options?.map((option, index) => (
              <SelectOption key={index} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </FormControl>
      );
    case InputTypeEnum.Email:
      return (
        <Input
          type="email"
          label={question.formLabel}
          helperText={
            errors?.[question.id] ? errors?.[question.id] : question.helperText
          }
          error={errors?.[question.id] ? true : false}
          name={question.id}
          value={formData[question.id] || ""}
          onChange={(e) => handleChange(question.id, e.target.value)}
        />
      );
    case InputTypeEnum.Password:
      return (
        <Input
          type="password"
          label={question.formLabel}
          helperText={
            errors?.[question.id] ? errors?.[question.id] : question.helperText
          }
          error={errors?.[question.id] ? true : false}
          name={question.id}
          value={formData[question.id] || ""}
          onChange={(e) => handleChange(question.id, e.target.value)}
        />
      );
    case InputTypeEnum.TextArea:
      return (
        <Input
          type="text"
          label={question.formLabel}
          helperText={
            errors?.[question.id] ? errors?.[question.id] : question.helperText
          }
          error={errors?.[question.id] ? true : false}
          name={question.id}
          value={formData[question.id] || ""}
          onChange={(e) => handleChange(question.id, e.target.value)}
          multiline
          rows={4}
        />
      );
    case null:
      return <></>;
    default:
      return <></>;
  }
};

export default InputRenderer;
