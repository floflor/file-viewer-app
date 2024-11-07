export interface MessageDisplayProps {
  message: string;
  isError?: boolean;
}

export interface FileData {
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  description: string;
}

export interface FileDetailsProps {
  data: FileData;
}
