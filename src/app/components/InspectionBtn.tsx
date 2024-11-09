import { Button } from "@mui/material";
import Link from "next/link";
import AddIcon from "../../../public/add.svg";

const InspectionBtn = () => {
  return (
    <Link href={"/create-inspection"}>
      <Button className="bg-green-900 text-white px-4 py-3 rounded-md text-button-small font-semibold">
        <AddIcon className="mr-2" />
        Create Inspection
      </Button>
    </Link>
  );
};

export default InspectionBtn;
