import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { BiAddToQueue } from "react-icons/bi"
import { UsersSetter } from "../types/User";
import { BASE_URL } from "../App";

const CreateUserModal: React.FC<{ setUsers: UsersSetter }> = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ inputs, setInputs ] = useState({name: "", role: "", description: "", gender: ""});

  const toast = useToast();

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/api/friends", {
        method: "POST",
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
        description: "Friend added successfully.",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
      setUsers((prevUsers) => [...prevUsers, data]);
      setInputs({name: "", role: "", description: "", gender: ""});
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


  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={(e) => handleCreateUser(e)}>
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
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Software Engineer"
                    value={inputs.role}
                    onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflow={"hidden"}
                  placeholder="A software engineer at @Google. Loves Coffee."
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </FormControl>

              <RadioGroup mt={4}>
                <Flex gap={4}>
                  <Radio
                    value="male"
                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                  >
                    Female
                  </Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                type="submit"
                isLoading={isLoading}
              >
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
)}

export default CreateUserModal