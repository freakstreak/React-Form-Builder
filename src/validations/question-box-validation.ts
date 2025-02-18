import { Dispatch } from "react";
import { InputTypeEnum, IQuestion } from "../types/IQuestion";

export const validateQuestion = ({
  question,
  setErrors,
}: {
  question: IQuestion;
  setErrors: Dispatch<any>;
}) => {
  setErrors(null);
  let newErrors: any = {};

  // Required Fields Validation
  if (!question.formLabel || question.formLabel.trim() === "") {
    newErrors.formLabel = "Question is required";
  }

  if (!question.inputType || question.inputType.trim() === "") {
    newErrors.inputType = "Question type is required.";
  }

  // Select Type Validation (Must Have Options)
  if (question.inputType === InputTypeEnum.Select) {
    if (!question.options || question.options.length === 0) {
      newErrors.selectOption =
        "At least one option is required for Select type.";
    } else {
      let optionErrors: any[] = [];

      question.options.forEach((option, index) => {
        let optionError: any = {};
        if (!option.label || option.label.trim() === "") {
          optionError.label = "Option label is required.";
        }
        if (!option.value || option.value.trim() === "") {
          optionError.value = "Option value is required.";
        }

        if (Object.keys(optionError).length > 0) {
          optionErrors[index] = optionError;
        }
      });

      if (optionErrors.length > 0) {
        newErrors.options = optionErrors;
      }
    }
  }

  // Number Type Validation (Min and Max)
  if (question.inputType === InputTypeEnum.Number) {
    if (question.min !== undefined && question.max !== undefined) {
      if (question.min > question.max) {
        newErrors.min = "Min value cannot be greater than Max value.";
      }
    }
  }

  if (Object.keys(newErrors).length) {
    setErrors(newErrors); // Update state with validation errors
  }
  return newErrors;
};
