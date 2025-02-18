import { InputTypeEnum } from "../types/IQuestion";

export const validateRenderedForm = (formData: any, questions: any) => {
  const errors: any = {};

  questions.forEach((question: any) => {
    const value = formData[question.id];

    if (question.formLabel.trim() === "") {
      errors[question.id] = "Please enter question title in Form Builder";
      return;
    }
    if (question.required && (!value || value.trim() === "")) {
      errors[question.id] = "This field is required";
      return;
    }

    if (question.inputType === InputTypeEnum.Email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        errors[question.id] = "Invalid email format";
        return;
      }
    }

    if (question.inputType === InputTypeEnum.Number) {
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        errors[question.id] = "Invalid number";
        return;
      }
      if (question.min !== undefined && numberValue < question.min) {
        errors[question.id] = `Value must be at least ${question.min}`;
        return;
      }
      if (question.max !== undefined && numberValue > question.max) {
        errors[question.id] = `Value must be at most ${question.max}`;
        return;
      }
    }

    if (question.inputType === InputTypeEnum.Password) {
      if (value && value.length < 6) {
        errors[question.id] = "Password must be at least 6 characters long";
        return;
      }
      const hasNumber = /[0-9]/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);
      if (!hasNumber || !hasLetter) {
        errors[question.id] = "Password must contain both letters and numbers";
        return;
      }
    }
  });

  return errors;
};
