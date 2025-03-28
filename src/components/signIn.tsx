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
import NewUserForm from "./newUserForm";
import {
  passwordValidation,
  emailValidation,
  nameValidation,
} from "@/state/userValidation";
import { Link } from "@heroui/link";

interface Props {
  button?: boolean;
  link?: boolean;
}

const signIn: React.FC<Props> = ({ button, link }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {link && (
        <Link
          className="w-full"
          onPress={onOpen}
          href="#"
          size="lg"
          color="foreground"
        >
          Register
        </Link>
      )}
      {button && (
        <Button className="w-full" onPress={onOpen}>
          Register
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a new account or sign in with your favorite social
              </ModalHeader>
              <ModalBody>
                <Oauth />
                <NewUserForm
                  passwordValidation={passwordValidation}
                  emailValidation={emailValidation}
                  usernameValidation={nameValidation}
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

export default signIn;
