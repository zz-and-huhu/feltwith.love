export interface PresignedUrlResponse {
  url: string;
  key: string;
  error?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
}

export interface UserImage {
  filename: string;
  url: string;
  uploadedAt: string;
}

export interface UserData {
  userid: string;
  name: string;
  email: string;
  comment?: string;
  images: UserImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  comment?: string;
}

export interface AddImageRequest {
  userid: string;
  filename: string;
  url: string;
}
