import React, { useState } from "react";
import { InputTypeEnum, IQuestion, ISelectOption } from "../types/IQuestion";
import Input from "../components/primitives/Input";
import { Select, SelectOption } from "../components/primitives/Select";
import Button from "../components/primitives/Button";
import Typographys from "../components/primitives/Typography";
import Typography from "../components/primitives/Typography";
import FormControl from "../components/primitives/FormControl";
import InputLabel from "../components/primitives/InputLabel";
import InputRenderer from "../components/app/input-renderer/InputRenderer";
import { validateRenderedForm } from "../validations/rendered-form-validation";
import Modal from "../components/primitives/Modal";
import Previewer from "../components/app/input-renderer/Previewer";
import CloseIcon from "@mui/icons-material/Close";

const FormRenderer = ({ questions }: { questions: IQuestion[] }) => {
  const [errors, setErrors] = useState<any>(null);
  const [previewAnswer, setPreviewAnswer] = useState(false);
  const [formData, setFormData] = React.useState<any>(
    prepareFormData(questions)
  );

  const handleChange = (formDataKey: string, value: string) => {
    setFormData({ ...formData, [formDataKey]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    const validationErrors = validateRenderedForm(formData, questions);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setPreviewAnswer(true);
  };

  return (
    <div className="border p-8 max-h-screen overflow-y-auto bg-white rounded-lg">
      <form
        noValidate
        onSubmit={submitHandler}
        className="w-full flex flex-col gap-4 py-2"
      >
        {questions.map((question) => (
          <InputRenderer
            key={question.id}
            errors={errors}
            question={question}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
        <input className="border" type="hidden" />
        {questions.length ? (
          <Button type="submit" variant="contained" className="w-fit">
            Submit
          </Button>
        ) : (
          <Typography>Create Questions to Render</Typography>
        )}
      </form>
      <Modal open={previewAnswer} onClose={() => setPreviewAnswer(false)}>
        <div className="p-8">
          <div className="flex justify-between items-center">
            <Typography variant="h6">Submission Preview</Typography>
            <span onClick={() => setPreviewAnswer(false)}>
              <CloseIcon className="cursor-pointer" />
            </span>
          </div>
          <Previewer formData={formData} questions={questions} />
        </div>
      </Modal>
    </div>
  );
};

const prepareFormData = (questions: IQuestion[]) => {
  return questions.reduce((acc, question) => {
    if (question.inputType === InputTypeEnum.Select && question.multiSelect) {
      acc[question.id] = [];
      return acc;
    }
    acc[question.id] = "";
    return acc;
  }, {} as Record<string, any>);
};

export default FormRenderer;
