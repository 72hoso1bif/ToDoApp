export class User {
  id?: string;
  email: string;
  username: string;
  password: string;
  roles?: any;
  tokenType?: string;
  accessToken?: string;
  image?: Image;
  editMode?: boolean;
}

export class UserDTO {
  id: number;
  email: string;
  username: string;
  password?: string;
  imageId: number;
}

export class Image {
  id: number;
  content: [];
  name: string;
}
