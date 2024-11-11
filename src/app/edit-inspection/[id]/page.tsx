"use client";

import {
  InspectionData,
  EditInspectionFormData,
} from "@/app/interfaces/interfaces";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormHelperText,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export interface Errors {
  priceError?: boolean;
}

const EditInspectionPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const [formData, setFormData] = useState<EditInspectionFormData>({
    note: "",
    price: 0,
    samplingPoint: [],
    samplingDate: undefined,
  });
  const [errors, setErrors] = useState<Errors>();
  const [samplingPointArray, setSamplingPointArray] = useState<string[]>([]);
  const { id } = useParams();

  const validateInput = () => {
    let isPriceError = false;
    if (formData.price) {
      isPriceError = !(formData.price >= 0 && formData.price <= 1000000);
    }
    setErrors({
      priceError: isPriceError,
    });
    return !isPriceError;
  };

  const transformEditFormData = (formData: EditInspectionFormData) => {
    return {
      inspectionID: id,
      updatedAt: new Date().toISOString(),
      note: formData.note,
      samplingPoint: formData.samplingPoint,
      samplingDate: formData.samplingDate,
      price: formData.price,
    };
  };

  const EditInspection = (formData: EditInspectionFormData) => {
    try {
      setLoading(true);
      fetch("http://localhost:3000/history", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
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
    if (validateInput()) {
      console.log(formData);
      const transformedData = transformEditFormData(formData);
      EditInspection(transformedData);
      console.log(transformedData);
    }
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
    const getHistoryByID = async () => {
      try {
        const res = await fetch(`http://localhost:3000/history/${id}`);
        if (!res.ok) {
          throw new Error(`Response status:   ${res.status}`);
        }
        const data = await res.json();
        setFormData({
          note: data.note || "",
          price: data.price || 0,
          samplingPoint: data.samplingPoint || [],
          samplingDate: data.samplingDate,
        });
        setSamplingPointArray(data.samplingPoint);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getHistoryByID();
  }, [id]);

  return (
    <div className="flex flex-col items-center py-10 min-h-screen gap-8">
      <p className="text-h5 font-bold m-0">Edit Inspection ID : {id}</p>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form className="space-y-6 " onSubmit={handleSubmit}>
          <FormControl className="space-y-2" fullWidth>
            <FormLabel className=" text-black font-semibold">Note</FormLabel>
            <TextField
              placeholder="Note"
              variant="outlined"
              onChange={(v) =>
                setFormData({ ...formData, note: v.target.value })
              }
              value={formData.note}
            />
          </FormControl>

          <FormControl
            className="space-y-2"
            fullWidth
            error={errors?.priceError}
          >
            <FormLabel className=" text-black font-semibold">Price</FormLabel>
            <TextField
              placeholder="10,000"
              variant="outlined"
              onChange={(v) =>
                setFormData({
                  ...formData,
                  price: Number(v.target.value),
                })
              }
              value={formData.price}
              type="number"
              error={errors?.priceError}
            />
            {errors?.priceError && (
              <FormHelperText>
                The price should be within the range of 0 - 100,000
              </FormHelperText>
            )}
          </FormControl>

          <div>
            <FormLabel className=" text-black font-semibold">
              Sampling Point
            </FormLabel>
            <div className="flex justify-around">
              <FormControlLabel
                control={
                  <Checkbox
                    value={"front-end"}
                    onChange={handleCheckbox}
                    checked={formData.samplingPoint?.includes("front-end")}
                  />
                }
                label="Front End"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"back-end"}
                    onChange={handleCheckbox}
                    checked={formData.samplingPoint?.includes("back-end")}
                  />
                }
                label="Back End"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value={"other"}
                    onChange={handleCheckbox}
                    checked={formData.samplingPoint?.includes("other")}
                  />
                }
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
                setFormData({
                  ...formData,
                  samplingDate: v ? v?.toDate().toISOString() : null,
                })
              }
              format="DD/MM/YYYY HH:mm:ss"
              views={["day", "month", "year", "hours", "minutes", "seconds"]}
              ampm={false}
              value={
                formData.samplingDate ? dayjs(formData.samplingDate) : null
              }
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
};

export default EditInspectionPage;
