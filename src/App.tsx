import { useEffect, useState } from "react";

import { IQuestion } from "./types/IQuestion";
import FormBuilder from "./sections/FormBuilder";
import { ToastContainer } from "react-toastify";
import { getQuestions } from "./services/question";
import FormRenderer from "./sections/FormRenderer";
import FullScreenLoader from "./components/composites/FullScreenLoader";
import Typography from "./components/primitives/Typography";
import Modal from "./components/primitives/Modal";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQuestions = async () => {
    setLoading(true);
    const response = await getQuestions();
    setQuestions(response);
    setLoading(false);
  };

  const refetchQuestions = async () => {
    const response = await getQuestions();
    setQuestions(response);
  };

  useEffect(() => {
    fetchQuestions();
    return;
  }, []);

  return (
    <div className="p-8">
      {loading ? (
        <FullScreenLoader open />
      ) : (
        <div className="grid lg:grid-cols-2 sm:grid-cols-1">
          <FormBuilder
            fetchQuestions={refetchQuestions}
            loading={loading}
            questions={questions}
            setLoading={setLoading}
            setQuestions={setQuestions}
          />

          <div className=" p-8 border overflow-y-scroll">
            <Typography variant="h4" className="!mb-6">
              Form Renderer
            </Typography>
            <FormRenderer questions={questions} />
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick={false}
      />
    </div>
  );
};

export default App;
