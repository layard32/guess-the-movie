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
import ExistingUserForm from "./existingUserForm";
import { passwordValidation, emailValidation } from "@/state/userValidation";

const logIn: React.FC = () => {
  // gestione del modal tramite heroui
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button onPress={onOpen}>Login </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Login with your account or your favorite social
              </ModalHeader>
              <ModalBody>
                <Oauth />
                <ExistingUserForm
                  passwordValidation={passwordValidation}
                  emailValidation={emailValidation}
                  closeModal={onOpenChange}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default logIn;
