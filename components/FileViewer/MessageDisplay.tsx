import { MessageDisplayProps } from "./types";

export default function MessageDisplay({
  message,
  isError,
}: MessageDisplayProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className={isError ? "bg-red-50 shadow-md h-fit px-4 py-6" : ""}>
        <span>{message}</span>
      </div>
    </div>
  );
}
