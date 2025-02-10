export interface PresignedUrlResponse {
  url: string;
  key: string;
  error?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
}
