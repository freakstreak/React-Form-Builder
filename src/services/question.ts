import { IQuestion } from "../types/IQuestion";
import { get } from "./localstorage";

export const createQuestion = async (question: IQuestion) => {
  return new Promise((resolve, reject) => {
    const delay = 500;
    setTimeout(() => {
      try {
        const data: string = get("data") ?? "[]";
        const questionsData = JSON.parse(data);
        questionsData.push(question);
        localStorage.setItem("data", JSON.stringify(questionsData));
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    }, delay);
  });
};

export const getQuestions = async (): Promise<IQuestion[]> => {
  return new Promise((resolve, reject) => {
    const delay = 500;
    setTimeout(() => {
      try {
        const data: string = get("data") ?? "[]";
        const questionsData = JSON.parse(data);
        return resolve(questionsData);
      } catch (error: any) {
        reject(error);
      }
    }, delay);
  });
};

export const updateQuestion = async (question: IQuestion) => {
  return new Promise((resolve, reject) => {
    const delay = 500;
    setTimeout(() => {
      try {
        const data: string = get("data") ?? "[]";
        const questionsData = JSON.parse(data);
        const newQuestionsData = questionsData.map((q: IQuestion) =>
          q.id === question.id ? question : q
        );
        localStorage.setItem("data", JSON.stringify(newQuestionsData));
        return resolve(newQuestionsData);
      } catch (error: any) {
        reject(error);
      }
    }, delay);
  });
};

export const deleteQuestion = async (id: string) => {
  return new Promise((resolve, reject) => {
    const delay = 500;
    setTimeout(() => {
      try {
        const data: string = get("data") ?? "[]";
        const questionsData = JSON.parse(data);
        const newQuestionsData = questionsData.filter(
          (question: IQuestion) => question.id !== id
        );
        localStorage.setItem("data", JSON.stringify(newQuestionsData));
        return resolve(newQuestionsData);
      } catch (error: any) {
        reject(error);
      }
    }, delay);
  });
};
