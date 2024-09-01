import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { User, UsersSetter } from "../types/User";
import { BASE_URL } from "../App";


const UserCard: React.FC<{ user: User, setUsers : UsersSetter }> = ({ user, setUsers }) => {

  const toast = useToast();

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends/" + user.id, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));

      toast({
        status: "success",
        title: "Deleted",
        description: "Friend deleted successfully.",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    }
  }

  return (
    <Card
      bg={useColorModeValue("gray.200", "gray.700")}
    >
      <CardHeader>
        <Flex gap={4}>
          <Flex
            flex={1}
            gap={4}
            alignItems={"center"}
          >
            <Avatar src={ user.imgUrl } />

            <Box>
              <Heading size={"sm"}>{ user.name }</Heading>
              <Text>{ user.role }</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant={"ghost"}
              colorScheme="red"
              size={"sm"}
              aria-label="See Menu"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>

        </Flex>
      </CardHeader>

      <CardBody>
        <Text> { user.description } </Text>
      </CardBody>
    </Card>
  )
}

export default UserCard