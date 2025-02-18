import DeleteIcon from "@mui/icons-material/Delete";

import Input from "../../primitives/Input";
import Button from "../../primitives/Button";
import { IQuestion } from "../../../types/IQuestion";
import { FormHelperText } from "@mui/material";

const AddSelectOptionSection = ({
  addNewOption,
  question,
  setQuestion,
  removeOption,
  errors,
}: {
  addNewOption: () => void;
  question: IQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
  removeOption: (index: number) => void;
  errors: any;
}) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outlined" onClick={addNewOption}>
          + Add Option
        </Button>
        {errors?.selectOption && (
          <FormHelperText className="!text-red-600">
            {errors?.selectOption}
          </FormHelperText>
        )}
      </div>

      {/* {errors.} */}
      {question.options?.map((option, index) => {
        return (
          <div key={index} className="flex gap-4 items-center w-full">
            <Input
              type="text"
              label="Label"
              value={option.label}
              error={errors?.options?.[index]?.label ? true : false}
              helperText={errors?.options?.[index]?.label}
              onChange={(e) => {
                setQuestion((prev) => ({
                  ...prev,
                  options: prev.options
                    ? prev.options.map((opt, i) =>
                        i === index ? { ...opt, label: e.target.value } : opt
                      )
                    : [],
                }));
              }}
            />
            <Input
              type="text"
              label="Value"
              value={option.value}
              error={errors?.options?.[index]?.value ? true : false}
              helperText={errors?.options?.[index]?.value}
              onChange={(e) => {
                setQuestion((prev) => ({
                  ...prev,
                  options: prev.options
                    ? prev.options.map((opt, i) =>
                        i === index ? { ...opt, value: e.target.value } : opt
                      )
                    : [],
                }));
              }}
            />
            <span onClick={() => removeOption(index)}>
              <DeleteIcon className="text-red-600 cursor-pointer hover:bg-red-100 hover:rounded-xl p-1 !text-3xl" />
            </span>
          </div>
        );
      })}
    </>
  );
};

export default AddSelectOptionSection;
