import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { BiEdit } from "react-icons/bi"
import { User, UsersSetter } from "../types/User"
import { useState } from "react"
import { BASE_URL } from "../App"


const EditModal: React.FC<{ user: User, setUsers : UsersSetter }> = ({ user, setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ isLoading, setIsLoading ] = useState(false);
  const [ inputs, setInputs ] = useState({name: user.name, role: user.role, description: user.description});

  const toast = useToast();

  const close = () => {
    setInputs({name: user.name, role: user.role, description: user.description});
    onClose();
  }

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/api/friends/" + user.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }
      
      toast({
        status: "success",
        title: "Yayy 🎉",
        description: "Friend edited successfully.",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      
      setUsers((prevUsers) => prevUsers.map((u) => u.id !== user.id ? u : data));
      user = data;
      close();

    } catch (error: any) {
      toast({
        status: "error",
        title: error.message,
        description: error.message,
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
      onClose={close}
    >
      <ModalOverlay />
      <form onSubmit={(e) => handleEditUser(e)}>
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
                <Input
                  value={inputs.name}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Input
                  value={inputs.role}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </FormControl>
            </Flex>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                resize={"none"}
                overflow={"hidden"}
                value={inputs.description}
                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>Edit</Button>
            <Button onClick={close}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  </>
}

export default EditModal