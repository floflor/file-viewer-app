import { MessageDisplayProps } from "./types";

export default function MessageDisplay({
  message,
  isError,
}: MessageDisplayProps) {
  return (
    <div className="w-full flex items-center justify-center dark:bg-[#19191B] dark:text-white">
      <div className={isError ? "bg-red-50 rounded-sm shadow-md h-fit px-4 py-6 dark:bg-[#4F1313] dark:text-white" : ""}>
        <span>{message}</span>
      </div>
    </div>
  );
}
