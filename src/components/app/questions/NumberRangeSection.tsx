import { IQuestion } from "../../../types/IQuestion";
import Input from "../../primitives/Input";

const NumberRangeSection = ({
  question,
  handleOnChange,
  errors,
}: {
  question: IQuestion;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
}) => {
  return (
    <>
      <Input
        type="number"
        label="Min"
        name="min"
        value={question.min}
        onChange={handleOnChange}
        error={errors?.min ? true : false}
        helperText={errors?.min}
      />
      <Input
        type="number"
        label="Max"
        name="max"
        value={question.max}
        onChange={handleOnChange}
        error={errors?.max ? true : false}
        helperText={errors?.max}
      />
    </>
  );
};

export default NumberRangeSection;
