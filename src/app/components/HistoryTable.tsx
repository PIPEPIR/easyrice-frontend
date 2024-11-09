"use client";

import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "../../../public/delete.svg";
import { type InspectionData } from "../interfaces/interfaces";

const HistoryTable = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [inspections, setInspections] = useState<InspectionData[]>([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const res = await fetch("http://localhost:3000/history");
        if (!res.ok) {
          throw new Error(`Status code: ${res.status}`);
        }
        const fetchedData = await res.json();
        console.log(fetchedData);

        setInspections(fetchedData);
      } catch (e) {
        console.log(e);
      }
    };

    getHistory();
  }, []);

  const handleSelect = (inspectionID: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(inspectionID)
        ? prevSelected.filter((id) => id !== inspectionID)
        : [...prevSelected, inspectionID]
    );
  };

  const onDelete = () => {};

  return (
    <>
      {selected.length > 0 && (
        <div className="pb-6 flex items-center gap-2">
          <Button className="text-subtitle3 font-semibold" variant="outlined">
            <DeleteIcon className="mr-1" />
            Delete
          </Button>
          <p className="text-body3">
            {`Select items: ${selected.length}`}{" "}
            {selected.length <= 1 ? "item" : "items"}
          </p>
        </div>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-green-900">
            <TableRow>
              <TableCell
                padding="checkbox"
                className="text-subtitle3 font-semibold text-white"
              ></TableCell>
              <TableCell
                className="text-subtitle3 font-semibold text-white"
                width={"25%"}
              >
                Create Date - Time
              </TableCell>
              <TableCell
                className="text-subtitle3 font-semibold text-white"
                width={"20%"}
              >
                Inspection ID
              </TableCell>
              <TableCell className="text-subtitle3 font-semibold text-white">
                Name
              </TableCell>
              <TableCell className="text-subtitle3 font-semibold text-white">
                Standard
              </TableCell>
              <TableCell className="text-subtitle3 font-semibold text-white">
                Note
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspections.map((inspection) => (
              <TableRow
                key={inspection.inspectionID}
                selected={selected.includes(inspection.inspectionID)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selected.includes(inspection.inspectionID)}
                    onChange={() => handleSelect(inspection.inspectionID)}
                  />
                </TableCell>
                <TableCell className="text-body2">
                  {inspection.createDate}
                </TableCell>
                <TableCell className="text-body2 text-ellipsis">
                  {inspection.inspectionID}
                </TableCell>
                <TableCell className="text-body2">{inspection.name}</TableCell>
                <TableCell className="text-body2">
                  {inspection.standardName}
                </TableCell>
                <TableCell className="text-body2">
                  {inspection.samplingDate || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryTable;
