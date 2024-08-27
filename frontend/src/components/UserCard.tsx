import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useColorModeValue } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";

type UserCardProps = {
  user: {
    id: number;
    name: string;
    role: string;
    description: string;
  };
};

const UserCard = ({ user }: UserCardProps) => {
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
            <Avatar src="https://avatar.iran.liara.run/public" />

            <Box>
              <Heading size={"sm"}>{ user.name }</Heading>
              <Text>{ user.role }</Text>
            </Box>
          </Flex>

          <Flex>
            <EditModal user={user} />
            <IconButton
              variant={"ghost"}
              colorScheme="red"
              size={"sm"}
              aria-label="See Menu"
              icon={<BiTrash size={20} />}
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