import { IQuestion } from "../../../types/IQuestion";

interface IFormData {
  [key: string]: string;
}

interface IPreviewer {
  formData: IFormData;
  questions: IQuestion[];
}

const Previewer = ({ formData, questions }: IPreviewer) => {
  return (
    <div>
      <div className="mt-4 flex flex-col gap-4">
        {questions.map((data, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Question {index + 1}:</span>
              <span>{data.formLabel}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-semibold">Answer:</span>
              <span>{formData[data.id]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Previewer;
