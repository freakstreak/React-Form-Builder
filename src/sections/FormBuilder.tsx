import { useState } from "react";
import { InputTypeEnum, IQuestion } from "../types/IQuestion";
import { createQuestion, getQuestions } from "../services/question";
import QuestionBox from "../components/app/questions/QuestionBox";
import Button from "../components/primitives/Button";
import { v4 as uuidv4 } from "uuid";
import Typography from "../components/primitives/Typography";

interface IFromBuilder {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
  fetchQuestions: () => Promise<void>;
}
const FormBuilder = ({
  questions,
  setQuestions,
  fetchQuestions,
  loading,
}: IFromBuilder) => {
  const [addingQuestion, setAddingQuestion] = useState(false);
  const addQuestions = async () => {
    setAddingQuestion(true);

    const newQuestion: IQuestion = {
      id: uuidv4(),
      inputType: InputTypeEnum.Text,
      formLabel: "",
      required: false,
      hidden: false,
      order: questions.length + 1,
      options: [],
    };

    await createQuestion(newQuestion);
    const response = await getQuestions();
    response[response.length - 1].newQuestion = true;
    setQuestions(response);
    setAddingQuestion(false);
  };

  return (
    <div className="w-full max-h-screen overflow-y-scroll p-8 border">
      <Typography variant="h4" className="!mb-6">
        Form Builder
      </Typography>
      {questions?.map((question) => {
        return (
          <QuestionBox
            key={question.id}
            currentQuestion={question}
            refetchQuestions={fetchQuestions}
          />
        );
      })}
      <Button
        className="!mt-8"
        disabled={addingQuestion}
        variant="contained"
        onClick={addQuestions}
      >
        {addingQuestion ? "Adding..." : "+ Add Question"}
      </Button>
    </div>
  );
};

export default FormBuilder;
