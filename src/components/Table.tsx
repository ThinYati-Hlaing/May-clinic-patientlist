"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import { PatientDataType } from "../../mock/data";
import { SubmitHandler, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import EditModal from "./EditModal";
import Modals from "./Modals";

interface ListTableProps {
  data: PatientDataType[];
  id?: string | undefined;
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  // onClose: () => void;
  onSubmit: SubmitHandler<PatientDataType>;
  showSuccessAlert: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  selectOne: string | null;
  selectTwo: string | null;
  searchKeyword: string | null;
}

const ListTable: FC<ListTableProps> = ({
  data,
  selectOne,
  selectTwo,
  searchKeyword,
}) => {
  const [list, setLists] = useState<PatientDataType[]>(data);

  const [editModal, setEditModal] = useState(false);

  const [alertType, setAlertType] = useState<"delete" | "update" | null>(null);
  const [dialog, setDialog] = useState(false);
  const [selectedPatientData, setSelectedPatientData] =
    useState<PatientDataType | null>(null);

  const [alert, setAlert] = useState(false);

  const handleCloseEditForm = () => {
    setEditModal(false);
  };

  const filterList = list.filter((listItem) => {
    const matchesKeyword = listItem.name
      .toLocaleLowerCase()
      .includes(searchKeyword?.toLocaleLowerCase() || "");
    const matchesStatus = listItem.status
      .toLocaleLowerCase()
      .includes(selectOne?.toLocaleLowerCase() || "");

    const matchesBreed = listItem.breed
      .toLocaleLowerCase()
      .includes(selectTwo?.toLocaleLowerCase() || "");

    return matchesKeyword && matchesStatus && matchesBreed;
  });

  useEffect(() => {
    setLists(data);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const checkList = (id: string) => {
    const result = list.map((list) =>
      list.id === id ? { ...list, isDone: !list.isDone } : list
    );

    setLists(result);
  };

  const doneAllList = () => {
    const allDone = list.every((item) => item.isDone);
    const doneList = list.map((list) => ({
      ...list,
      isDone: !allDone,
    }));
    setLists(doneList);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosed = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const opened = Boolean(anchorEl);
  const id = opened ? "simple-popover" : undefined;
  return (
    <Box sx={{ height: 350}}>
      <TableContainer component={Paper} sx={{ maxHeight: 350}}>
        <Table
          stickyHeader
          aira-label="sticky table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={list.length > 0 && list.every((item) => item.isDone)}
                  indeterminate={
                    list.some((item) => item.isDone) &&
                    !list.every((item) => item.isDone)
                  }
                  onChange={() => doneAllList()}
                />
              </TableCell>
              <TableCell sx={{ minWidth: 60, color: "#54BAB9" }} align="center">
                ID
              </TableCell>
              <TableCell sx={{ minWidth: 80, color: "#54BAB9" }} align="center">
                Pet Name
              </TableCell>
              <TableCell sx={{ minWidth: 0, color: "#54BAB9" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ minWidth: 90, color: "#54BAB9" }} align="center">
                Pawrent
              </TableCell>
              <TableCell
                sx={{ minWidth: 120, color: "#54BAB9" }}
                align="center"
              >
                Breed
              </TableCell>
              <TableCell sx={{ minWidth: 60, color: "#54BAB9" }} align="center">
                Gender
              </TableCell>
              <TableCell sx={{ minWidth: 80, color: "#54BAB9" }} align="center">
                Date of Birth
              </TableCell>
              <TableCell sx={{ minWidth: 130, color: "#54BAB9" }} align="right">
                Contact Phone No.
              </TableCell>
              <TableCell
                sx={{ minWidth: 140, color: "#54BAB9" }}
                align="center"
              >
                Adress
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ color: "#54BAB9"}}>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100px",
                    }}
                  >
                    <Typography sx={{ color: "gray", fontWeight: 500 }}>
                      There is no list...
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filterList.map((patient) => {
                return (
                  <TableRow
                    key={patient.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell width={100}>
                      <Checkbox
                        checked={patient.isDone}
                        onChange={() => checkList(patient.id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {patient.id}
                    </TableCell>
                    <TableCell width={120} align="center">
                      {patient.name}
                    </TableCell>
                    <TableCell align="center">
                      <Image
                        src={
                          patient.status === "allergy"
                            ? "/image/allergy.png"
                            : "/image/pickyeater.png"
                        }
                        alt="status-image"
                        width={20}
                        height={20}
                      />
                    </TableCell>
                    <TableCell align="center">{patient.pawrent}</TableCell>
                    <TableCell align="center">{patient.breed}</TableCell>
                    <TableCell align="center">{patient.gender}</TableCell>
                    <TableCell align="center">{patient.birth}</TableCell>
                    <TableCell align="center">{patient.phone}</TableCell>
                    <TableCell align="left">{patient.address}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={(e) => {
                          handleClicked(e);
                          setSelectedPatientData(patient);
                        }}
                      >
                        <Image
                          aria-describedby={id}
                          src={patient.icon}
                          alt="icon"
                          width={20}
                          height={20}
                        />
                      </Button>
                      <Modals
                        list={list}
                        setLists={setLists}
                        selectedPatientData={selectedPatientData}
                        setEditModal={setEditModal}
                        id={id}
                        opened={opened}
                        anchorEl={anchorEl}
                        handleClosed={handleClosed}
                        setAlertType={setAlertType}
                        setAlert={setAlert}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            {editModal && selectedPatientData && (
              <EditModal
                list={list}
                setLists={setLists}
                setAlert={setAlert}
                setAlertType={setAlertType}
                data={selectedPatientData}
                handleClose={handleCloseEditForm}
                onSubmit={handleCloseEditForm}
                
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box  position={"fixed"} bottom={0} left={0}
        sx={{
          lg: { width: "30%" },
          width: "35%",
          // marginTop: "10%",
        }}
      >
        <Collapse in={alert}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlert(false)}
              >
                <CloseIcon fontSize="inherit" onClick={() => setAlert(false)} />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alertType === "delete"
              ? "Patient is successfully deleted!"
              : alertType === "update"
              ? "Patient is successfully updated!"
              : "No action performed!"}
          </Alert>
        </Collapse>
      </Box>

    </Box>
  );
};

export default ListTable;
