import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import Oauth from "./oauth";
import UserForm from "./newUserForm";
import {
  passwordValidation,
  emailValidation,
  nameValidation,
} from "@/state/userValidation";

const signIn: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>Register</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Register
              </ModalHeader>
              <ModalBody>
                <Oauth />
                <UserForm
                  passwordValidation={passwordValidation}
                  emailValidation={emailValidation}
                  usernameValidation={nameValidation}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default signIn;
