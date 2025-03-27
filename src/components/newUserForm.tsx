import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { signup } from "@/state/thunks";
import { AppDispatch } from "@/state/store";

interface Props {
  usernameValidation?: (value: string) => string | null;
  emailValidation?: (value: string) => string | null;
  passwordValidation?: (value: string) => string | null;
}

const userForm: React.FC<Props> = ({
  usernameValidation,
  emailValidation,
  passwordValidation,
}: Props) => {
  // gestione del dispatch per signup con email e password
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // uso formdata per ottenere i valori dei campi
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    dispatch(signup({ email: email, password: password }));
  };

  return (
    <>
      <Form className="w-full max-w-xs" onSubmit={onSubmit}>
        <Input
          isRequired
          label="Username"
          placeholder="Enter your username"
          type="text"
          labelPlacement="outside"
          name="username"
          validate={
            usernameValidation
              ? (value) => usernameValidation(value)
              : undefined
          }
        />
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="text"
          labelPlacement="outside"
          name="email"
          validate={
            emailValidation ? (value) => emailValidation(value) : undefined
          }
        />
        <Input
          isRequired
          label="Password"
          placeholder="Enter your password"
          type="password"
          labelPlacement="outside"
          name="password"
          validate={
            passwordValidation
              ? (value) => passwordValidation(value)
              : undefined
          }
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default userForm;
