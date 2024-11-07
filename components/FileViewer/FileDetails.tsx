import moment from "moment";
import { FileDetailsProps } from "./types";

export default function FileDetails({ data }: FileDetailsProps) {
  return (
    <div className="shadow-md bg-white w-[60%] flex flex-col gap-3 py-4 px-6">
      <div className="self-end flex gap-4">
        <span>Created: {moment(data.createdAt).format("LLL")}</span>
        <span>By: {data.createdBy}</span>
      </div>
      <div className="self-end flex gap-4">
        <span>Last Modified: {moment(data.lastModifiedAt).format("LLL")}</span>
        <span>By: {data.lastModifiedBy}</span>
      </div>
      {data.description}
    </div>
  );
}
