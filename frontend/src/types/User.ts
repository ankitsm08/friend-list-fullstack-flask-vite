export interface User {
  id: string;
  name: string;
  role: string;
  description: string;
  gender: string;
  imgUrl: string;
}

export type UsersSetter = React.Dispatch<React.SetStateAction<User[]>>