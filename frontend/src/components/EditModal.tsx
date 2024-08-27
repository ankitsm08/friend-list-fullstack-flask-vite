import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"

type UserProps = {
  user: {
    id: number;
    name: string;
    role: string;
    description: string;
  };
};

const EditModal = ({ user }: UserProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return <>
    <IconButton onClick={onOpen}
      variant={"ghost"}
      colorScheme="blue"
      size={"sm"}
      aria-label="See Menu"
      icon={<BiEdit size={20} />}
    />

    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My New BFF 😍</ModalHeader> 
        <ModalCloseButton />

        <ModalBody pb={6}>
          <Flex
            alignItems={"center"}
            gap={4}
          >
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input value={user.name} />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input value={user.role} />
            </FormControl>
          </Flex>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              resize={"none"}
              overflow={"hidden"}
              value={user.description}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>Edit</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}

export default EditModal