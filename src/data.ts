import { v4 as uuidv4 } from "uuid";

const data = [
  {
    id: uuidv4(),
    formLabel: "What is the capital of France?",
    inputType: "text", // "number" || "select" || "email" || "password" || "textarea",
    options: [
      {
        lable: "Paris",
        value: "paris",
      },
      {
        lable: "London",
        value: "london",
      },
      {
        lable: "Berlin",
        value: "berlin",
      },
    ],
    max: 10,
    min: 1,
    required: true,
    hidden: false,
    numberType: "integer", // "float"
    helperText: "Please enter the capital of France",
  },
];
