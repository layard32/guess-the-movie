import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useDispatch } from "react-redux";
import { signup } from "@/state/thunks";
import { AppDispatch } from "@/state/store";
import { addToast } from "@heroui/toast";

interface Props {
  usernameValidation?: (value: string) => string | null;
  emailValidation?: (value: string) => string | null;
  passwordValidation?: (value: string) => string | null;
  closeModal?: () => void;
}

const userForm: React.FC<Props> = ({
  usernameValidation,
  emailValidation,
  passwordValidation,
  closeModal,
}: Props) => {
  // gestione del dispatch per signup con email e password
  const dispatch: AppDispatch = useDispatch();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      dispatch(signup({ email, password }));
      const result = await dispatch(signup({ email, password })).unwrap();
      console.log("result", result);
      if (result?.user) {
        // se la registrazione è riuscita, chiudiamo messaggio e mostriamo il toast
        closeModal?.();
        addToast({
          title: "Account successfully created",
          description: "Check your email to confirm your account",
          color: "success",
          timeout: 3500,
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error: any) {
      addToast({
        title: "Error when creating the account",
        description: error.message,
        color: "danger",
        timeout: 2500,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <>
      <Form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
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
        <Button type="submit" color="primary" className="mt-1 mb-2.5">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default userForm;
