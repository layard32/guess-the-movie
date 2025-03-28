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
import { Link } from "@heroui/link";

interface Props {
  button?: boolean;
  link?: boolean;
}

const logIn: React.FC<Props> = ({ button, link }: Props) => {
  // gestione del modal tramite heroui
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
          Log in
        </Link>
      )}
      {button && (
        <Button className="w-full" onPress={onOpen}>
          Log in
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
