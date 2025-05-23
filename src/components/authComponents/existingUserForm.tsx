import React from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { login } from "@/state/thunks";
import onSubmitSupabase from "@/hooks/onSubmitSupabase";

interface Props {
  usernameValidation?: (value: string) => string | null;
  emailValidation?: (value: string) => string | null;
  passwordValidation?: (value: string) => string | null;
  closeModal?: () => void;
}

const existingUserForm: React.FC<Props> = ({
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
      thunk: login,
      toastSuccessTitle: "Successfully logged in",
      toastErrorTitle: "Error when logging in",
      closingAction: closeModal,
    }),
    [isSubmitting, setIsSubmitting, closeModal]
  );

  return (
    <>
      <Form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
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
          Login
        </Button>
      </Form>
    </>
  );
};

export default existingUserForm;
