"use client";
import { InputLabel, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

const Toolbar = () => {
  return (
    <div className="px-4 py-5 bg shadow-sm rounded-lg bg-white">
      <div className="grid grid-cols-3 text-black gap-4">
        <div className="flex flex-col gap-2">
          <InputLabel className="text-subtitle2 text-black font-semibold">
            ID
          </InputLabel>
          <TextField placeholder="Search with ID" />
        </div>
        <div className="flex flex-col gap-2">
          <InputLabel className="text-subtitle2 text-black font-semibold">
            From Date
          </InputLabel>
          <DatePicker />
        </div>
        <div className="flex flex-col gap-2">
          <InputLabel className="text-subtitle2 text-black font-semibold">
            To Date
          </InputLabel>
          <DatePicker />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>Clear Filter</div>
        <div>Search</div>
      </div>
    </div>
  );
};

export default Toolbar;
