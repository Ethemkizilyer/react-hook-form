"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup"

const schema= yup.object({
  questions:yup.array().of(yup.object().shape({
    text:yup.string().required("This field is required")
  })).required()
})

type Question = { text: string };

type Inputs = {
  questions: Array<Question>;
};

const questionDefaultValue: Question = { text: "" };

export default function Home() {
  const {control,handleSubmit}=useForm<Inputs>({
    defaultValues:{questions:[]},
    resolver:yupResolver(schema),
  })

  const onSubmit:SubmitHandler<Inputs>=(data)=>console.log(data)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  function addNewQuestion() {
    append(questionDefaultValue);
  }

  function removeQuestion(questionIndex: number) {
    remove(questionIndex);
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Your Questions
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6"  onSubmit={handleSubmit(onSubmit)}>
          {fields.map((question,index)=>(
            <>
            <Controller
            key={question.id}
            control={control}
            name={`questions.${index}.text`}
            render={({field,fieldState})=>{
              const errorMessage=fieldState.error?.message
              return(
                <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
            {index + 1}. Question
            </label>
            <div className="flex flex-row gap-2 justify-center items-center mt-2">
              <div className="flex-1">
                <input
                  type="text"
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none ${
                    errorMessage ? "ring-red-500" : ""
                  }`}
                  {...field}
                />
              </div>
              <div>
                <button
                onClick={() => removeQuestion(index)}
                className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <span className="text-sm text-red-500">{errorMessage}</span>
          </div> 
              )
            }}
            
            />
           </>
          ))}
          

          <div className="flex flex-col gap-1">
            <button
            onClick={addNewQuestion}
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              + Add New Question
            </button>
            <hr className="my-2" />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
