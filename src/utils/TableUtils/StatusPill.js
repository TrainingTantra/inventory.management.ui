import React from "react";
import { classNames } from "../Utils";

const StatusPill = ({ value }) => {
  const status = value ? value.toLowerCase() : "unknown";
  return (
    <span
      className={classNames(
        "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
        status.startsWith("yes") ? "bg-green-100 text-green-700" : null,
        status.startsWith("inactive") ? "bg-yellow-100 text-yellow-700" : null,
        status.startsWith("no") ? "bg-red-100 text-red-700" : null
      )}
    >
      {status}
    </span>
  );
};

export default StatusPill;
