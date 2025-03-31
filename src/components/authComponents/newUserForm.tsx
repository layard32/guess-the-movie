import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { signup } from "@/state/thunks";
import onSubmitSupabase from "@/hooks/onSubmitSupabase";

interface Props {
  usernameValidation?: (value: string) => string | null;
  emailValidation?: (value: string) => string | null;
  passwordValidation?: (value: string) => string | null;
  closeModal?: () => void;
}

const newUserForm: React.FC<Props> = ({
  usernameValidation,
  emailValidation,
  passwordValidation,
  closeModal,
}: Props) => {
  // per evitare spam di submit
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // uso callback per evitare di ricreare la funzione ad ogni render
  const onSubmit = React.useCallback(
    onSubmitSupabase({
      isSubmitting: isSubmitting,
      setIsSubmitting: setIsSubmitting,
      thunk: signup,
      toastSuccessTitle: "Account successfully created",
      toastSuccessDescription: "Check your email to confirm your account",
      toastErrorTitle: "Error when creating the account",
      closingAction: closeModal,
    }),
    [isSubmitting, setIsSubmitting, closeModal]
  );

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
        <Button type="submit" color="primary" className="mt-1">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default newUserForm;
