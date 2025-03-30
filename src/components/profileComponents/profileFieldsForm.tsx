import React, { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "@/state/userValidation";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/selectors";
import giveUsername from "@/hooks/giveUsername";

const profileFieldsForm = () => {
  // prendo email ed username dall'utente
  const user = useSelector(selectUser);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(giveUsername());
  const [password, setPassword] = useState<string>(
    Math.random().toString(36).slice(-12)
  );

  // per gestire editabilità dei campi
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO gestire onsubmit facendo dispatch su update di supabase
  };

  return (
    <Form
      className="w-full min-w-[400px] flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      {" "}
      <Input
        isRequired
        label="Username"
        value={username}
        type="text"
        labelPlacement="inside"
        name="name"
        isDisabled={!isEditable}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        validate={nameValidation ? (value) => nameValidation(value) : undefined}
      />
      <Input
        isRequired
        label="Email"
        value={email}
        type="text"
        labelPlacement="inside"
        name="email"
        isDisabled={!isEditable}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        validate={
          emailValidation ? (value) => emailValidation(value) : undefined
        }
      />
      <Input
        isRequired
        label="Password"
        value={password}
        type="password"
        labelPlacement="inside"
        name="password"
        isDisabled={!isEditable}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        validate={
          passwordValidation ? (value) => passwordValidation(value) : undefined
        }
      />
      <div className="basis-full h-0 w-0"> </div>
      <div className="-mt-3.5">
        {isEditable ? (
          <Button
            type="submit"
            color="secondary"
            onPress={() => setIsEditable((prevState) => !prevState)}
          >
            Apply changes
          </Button>
        ) : (
          <Button
            type="button"
            color="primary"
            onPress={() => setIsEditable((prevState) => !prevState)}
          >
            Edit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default profileFieldsForm;
