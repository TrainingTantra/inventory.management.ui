import React, { useState } from "react";
import { userCreationFields } from "../../../constants/formFields";
import Input from "../../../components/Input";
import FormAction from "../../../components/FormAction";

const fields = userCreationFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

const CreateUser = () => {
  const [userCreationState, setUserCreationState] = useState(fieldsState);

  const handleChange = (e) =>
    setUserCreationState({
      ...userCreationState,
      [e.target.id]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userCreationState:", userCreationState);
    createUser();
  };
  //handle Signup API Integration here
  const createUser = () => {};

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={userCreationState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Create" />
      </div>
    </form>
  );
};

export default CreateUser;
