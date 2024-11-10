"use client";

import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  Divider,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import {
  Standard,
  Errors,
  InspectionData,
  FormData,
} from "../interfaces/interfaces";
import Link from "next/link";

const generateInspectionID = () => {
  const id = uuidv4();
  return `MI-${id}`;
};

export default function CreateInspection() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<Standard[]>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    standard: "",
  });
  const [errors, setErrors] = useState<Errors>();
  const [samplingPointArray, setSamplingPointArray] = useState<string[]>([]);

  const validateInput = () => {
    setErrors({
      nameError: !formData.name,
      standardError: !formData.standard,
    });
  };

  const transformFormData = (formData: FormData): InspectionData => {
    const selectedStandard = JSON.parse(formData.standard);

    return {
      inspectionID: generateInspectionID(),
      name: formData.name,
      createDate: new Date().toISOString(),
      standardID: selectedStandard.id,
      standardName: selectedStandard.name,
      note: formData.note,
      samplingPoint: formData.samplingPoint,
      samplingDate: formData.samplingDate?.toISOString(),
      price: formData.price,
      standardData: selectedStandard.standardData,
    };
  };

  const createInspection = (formData: InspectionData) => {
    try {
      setLoading(true);
      fetch("http://localhost:3000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok && res.status === 201) {
            router.push("/");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInput();
    if (errors?.nameError || errors?.standardError) {
      return;
    }
    const transformedData = transformFormData(formData);
    createInspection(transformedData);
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSamplingPointArray((prev) => [...prev, e.target.value]);
    } else {
      setSamplingPointArray((prev) => prev.filter((x) => x !== e.target.value));
    }
  };

  useEffect(() => {
    setFormData({ ...formData, samplingPoint: samplingPointArray });
  }, [samplingPointArray]);

  useEffect(() => {
    const getStandards = async () => {
      try {
        const res = await fetch("http://localhost:3000/standard");
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const standardsData = await res.json();
        setData(standardsData);
      } catch (e) {
        console.log(e);
      }
    };
    getStandards();
  }, []);

  return (
    <div className="flex flex-col items-center py-10 min-h-screen gap-8">
      <p className="text-h3 font-bold m-0">Create Inspection</p>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <FormControl
            className="space-y-2"
            fullWidth
            error={errors?.nameError}
          >
            <FormLabel className=" text-black font-semibold">Name*</FormLabel>
            <TextField
              placeholder="Please Enter Your Name"
              onChange={(v) =>
                setFormData({ ...formData, name: v.target.value })
              }
              error={errors?.nameError}
            />
          </FormControl>

          <FormControl
            className="space-y-2"
            fullWidth
            error={errors?.standardError}
          >
            <FormLabel className="text-black font-semibold">
              Standard*
            </FormLabel>
            <Select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  standard: e.target.value,
                })
              }
              variant="outlined"
              value={formData.standard}
              displayEmpty
            >
              <MenuItem value="">Please Select Standard</MenuItem>
              {data &&
                data.map((standard) => (
                  <MenuItem key={standard.id} value={JSON.stringify(standard)}>
                    {standard.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl className="space-y-2" fullWidth>
            <FormLabel className=" text-black font-semibold">
              Upload File
            </FormLabel>
            <TextField defaultValue="raw1.json" variant="outlined" disabled />
          </FormControl>

          <Divider />

          <FormControl className="space-y-2" fullWidth>
            <FormLabel className=" text-black font-semibold">Note</FormLabel>
            <TextField
              placeholder="Note"
              variant="outlined"
              onChange={(v) =>
                setFormData({ ...formData, note: v.target.value })
              }
            />
          </FormControl>

          <FormControl className="space-y-2" fullWidth>
            <FormLabel className=" text-black font-semibold">Price</FormLabel>
            <TextField
              placeholder="10,000"
              variant="outlined"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  price: parseFloat(v.target.value),
                })
              }
            />
          </FormControl>

          <div>
            <FormLabel className=" text-black font-semibold">
              Sampling Point
            </FormLabel>
            <div className="flex justify-around">
              <FormControlLabel
                control={
                  <Checkbox value={"front-end"} onChange={handleCheckbox} />
                }
                label="Front End"
              />
              <FormControlLabel
                control={
                  <Checkbox value={"back-end"} onChange={handleCheckbox} />
                }
                label="Back End"
              />
              <FormControlLabel
                control={<Checkbox value={"other"} onChange={handleCheckbox} />}
                label="Other"
              />
            </div>
          </div>

          <FormControl className="space-y-2" fullWidth>
            <FormLabel className=" text-black font-semibold">
              Date/Time of Sampling
            </FormLabel>
            <DateTimePicker
              onChange={(v) =>
                setFormData({ ...formData, samplingDate: v?.toDate() })
              }
              format="DD/MM/YYYY HH:mm:ss"
              views={["day", "month", "year", "hours", "minutes", "seconds"]}
              ampm={false}
            />
          </FormControl>

          <div className="flex justify-end gap-3">
            <Link href="/">
              <Button variant="outlined">Cancel</Button>
            </Link>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              disabled={loading}
            >
              Submit
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
