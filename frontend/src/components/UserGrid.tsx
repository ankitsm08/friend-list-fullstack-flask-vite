import { Flex, Grid, Spinner, Text } from "@chakra-ui/react"
import UserCard from "./UserCard"
import { User, UsersSetter } from "../types/User"
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const UserGrid: React.FC<{ users : User[], setUsers : UsersSetter }> = ({ users, setUsers }) => {

  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(BASE_URL + "/friends");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Something went wrong");
      }
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >

        {users.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers} />
        ))}
      </Grid>

      {(isLoading) && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {(!isLoading) && (users.length === 0) && (
        <Flex justifyContent={"center"}>
          <Text fontSize={"2xl"}>
            <Text as={"span"} fontSize={"3xl"} fontWeight={"bold"}>
              Poor you! 😧
            </Text> <br/>
            No Friends Found.
          </Text>
        </Flex>
      )}
    </>
  )
}

export default UserGrid