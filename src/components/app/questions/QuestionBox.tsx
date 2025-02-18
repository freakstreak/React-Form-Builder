import React, { useState } from "react";
import { InputTypeEnum, IQuestion } from "../../../types/IQuestion";
import Input from "../../primitives/Input";
import { Select, SelectOption } from "../../primitives/Select";
import { questionTypes } from "../../../constants/questions";
import { SelectChangeEvent, Typography } from "@mui/material";
import useAutoSave from "../../../hooks/useAutoSave";
import { deleteQuestion, updateQuestion } from "../../../services/question";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../primitives/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FormControl from "../../primitives/FormControl";
import InputLabel from "../../primitives/InputLabel";
import AddSelectOptionSection from "./AddSelectOptions";
import NumberRangeSection from "./NumberRangeSection";
import CheckBoxControl from "../../composites/CheckBoxControl";
import { toast } from "react-toastify";
import { validateQuestion } from "../../../validations/question-box-validation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Loader from "../../primitives/Loader";
import DeleteIcon from "@mui/icons-material/Delete";
import { successToast } from "../../primitives/Toast";

interface IQuestionBox {
  currentQuestion: IQuestion;
  refetchQuestions: () => Promise<void>;
}

const QuestionBox = ({ currentQuestion, refetchQuestions }: IQuestionBox) => {
  const [question, setQuestion] = useState<IQuestion>({ ...currentQuestion });
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(
    !!currentQuestion.newQuestion
  );
  const [errors, setErrors] = useState<any>(null);

  const handleSubmit = async () => {
    const error = await validateQuestion({
      question: question,
      setErrors: setErrors,
    });

    if (Object.keys(error).length > 0) {
      return;
    }

    await updateQuestion(question);
    await refetchQuestions();
    successToast("Question Updated");
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    await deleteQuestion(id);
    await refetchQuestions();
    setIsDeleting(false);
    successToast("Question Deleted");
  };

  const { isSaving } = useAutoSave({
    data: question,
    onSave: handleSubmit,
    delay: 500,
    shouldSave: JSON.stringify(question) !== JSON.stringify(currentQuestion),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const addNewOption = async () => {
    setQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), { label: "", value: "" }],
    }));
  };

  const removeOption = async (index: number) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [],
    }));
  };

  return (
    <Accordion
      aria-controls="panel1-content"
      id="panel1-header"
      sx={{ boxShadow: "none" }}
      className="mb-8 mx-auto border"
      expanded={isExpanded}
      onChange={() => {
        setIsExpanded(!isExpanded);
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div className="flex w-full flex-wrap items-center justify-between">
          <Typography>
            {question.formLabel || `Question ${question.order}`}
          </Typography>
          <span>
            {isExpanded ? (
              isSaving ? (
                <Loader size={20} />
              ) : !errors ? (
                <CheckCircleIcon color="success" />
              ) : (
                <>
                  <CancelIcon color="error" />
                </>
              )
            ) : (
              <div>
                <span>
                  {isDeleting ? (
                    <Loader size={20} />
                  ) : (
                    <DeleteIcon
                      color="error"
                      className="hover:bg-red-100 hover:rounded-xl p-0.5"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleDelete(question.id);
                      }}
                    />
                  )}
                </span>
              </div>
            )}
          </span>
        </div>
      </AccordionSummary>

      <AccordionDetails className="p-4 w-full shadow-none flex flex-col gap-4">
        <Input
          type="text"
          multiline
          label="Question Title"
          name="formLabel"
          value={question.formLabel}
          onChange={handleOnChange}
          error={errors?.formLabel ? true : false}
          helperText={errors?.formLabel}
        />

        <div className="flex flex-wrap gap-4 items-center w-full">
          <FormControl className="w-full sm:w-1/3 lg:w-1/3">
            <InputLabel id="question-type">Question Type</InputLabel>
            <Select
              labelId="question-type"
              className="w-full"
              value={question.inputType}
              label="Question Type"
              name="inputType"
              onChange={handleSelectChange}
            >
              {questionTypes.map(({ value, label }) => (
                <SelectOption key={value} value={value}>
                  {label}
                </SelectOption>
              ))}
            </Select>
          </FormControl>
          <CheckBoxControl
            name="required"
            checked={question.required}
            onChange={handleCheckBoxChange}
            label="Required"
          />

          <CheckBoxControl
            name="hidden"
            checked={question.hidden}
            onChange={handleCheckBoxChange}
            label="Hidden"
          />

          {question.inputType === InputTypeEnum.Select && (
            <CheckBoxControl
              name="multiSelect"
              checked={question.multiSelect}
              onChange={handleCheckBoxChange}
              label="Multi Select"
            />
          )}
        </div>

        <Input
          type="text"
          label="Helper Text"
          name="helperText"
          helperText="Additional Instructions (Optional)"
          value={question.helperText}
          onChange={handleOnChange}
        />

        {question.inputType === InputTypeEnum.Text && (
          <CheckBoxControl
            checked={question.isParagraph}
            label="Is Paragraph"
            onChange={handleCheckBoxChange}
            name="isParagraph"
          />
        )}

        {question.inputType === InputTypeEnum.Number && (
          <div className="flex gap-4 items-center w-full">
            <NumberRangeSection
              errors={errors}
              question={question}
              handleOnChange={handleNumberChange}
            />
          </div>
        )}

        {question.inputType === InputTypeEnum.Select && (
          <AddSelectOptionSection
            addNewOption={addNewOption}
            question={question}
            setQuestion={setQuestion}
            removeOption={removeOption}
            errors={errors}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};
export default QuestionBox;
