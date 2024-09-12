"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  Stack,
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
import PatientData, { PatientDataType } from "../../mock/data";
import { initialize } from "next/dist/server/lib/render-server";
import CreateForm from "./CreateForm";
import { SubmitHandler } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
interface ListTableProps {
  data: PatientDataType[];
  handleClose: () => void;
  handleOpen: () => void;
  open: boolean;
  onSubmit: SubmitHandler<PatientDataType>;
  showSuccessAlert: boolean;
}

const ListTable: FC<ListTableProps> = ({
  data,
  open,
  handleOpen,
  handleClose,
}) => {
  const [list, setLists] = useState<PatientDataType[]>(data);

  const [remove, setRemove] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setLists(data);
  }, [data]);

  const handleUpdate = (updatedData: PatientDataType,id : string) => {
    const newPatientData: PatientDataType ={
         id: updatedData.id,
        isDone:updatedData.isDone,
        name: updatedData.name,
        status: updatedData.status,
        pawrent: updatedData.pawrent,
        breed: updatedData.breed,
        gender: updatedData.gender,
        birth: updatedData.birth,
        phone: updatedData.phone,
        address:`${updatedData.address},${updatedData.town},${updatedData.city}`,
        icon: "/image/more.png",
    }
    const updatedList = list.map((patient) => 
    patient.id === updatedData.id ? newPatientData : patient);
    setLists(updatedList);
      handleOpen();  
    setLists((prevList) =>
      prevList.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData, 
          address:`${updatedData.address}, ${updatedData.town}, ${updatedData.city}`,} : item
      )
    );
    handleClosed()
    handleClose();
    setAlert(true);
  };


  const deleteList = (id: string) => {
    const updatedList = list.filter((patient) => patient.id !== id);
    setLists(updatedList);
    setRemove(true);
    setDialog(false);
    setAlert(true)
  };

  const checkList = (id: string) => {
    const result = list.map((list) =>
      list.id === id ? { ...list, isDone: !list.isDone } : list
    );

    setLists(result);
  };

  const doneAllList = () => {
    const doneList = list.map((list) => ({ ...list, isDone: !list.isDone }));
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
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
        <Table
          stickyHeader
          aira-label="sticky table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox onChange={() => doneAllList()} />
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
          <TableBody>
           
            {list.map((patient) => (
              <TableRow
                key={patient.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
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
                  <Button onClick={handleClicked}>
                    <Image
                      aria-describedby={id}
                      src={patient.icon}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  </Button>
                  <Popover
                    id={id}
                    open={opened}
                    anchorEl={anchorEl}
                    onClose={handleClosed}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Stack
                      direction="column"
                      spacing={1}
                      paddingY={1}
                      mr={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button 
                        onClick={() => handleOpen()}
                        >
                          <Image
                            src="/image/edit.png"
                            alt="status-image"
                            width={20}
                            height={20}
                          />
                        </Button>
                        <Typography sx={{ px: 0 }}>Edit</Typography>
                      </Box>
                      <CreateForm formType="update" data={patient} open={open} handleClose={handleClose} onSubmit={(data) => handleUpdate(data, patient.id)} defaultValues={patient}/>

                      <Divider flexItem />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          type="button"
                          sx={{ ml: 4 }}
                          onClick={() => {setSelectedPatientId(patient.id); setDialog(true)}}
                        >
                          <Image
                            src="/image/delete.png"
                            alt="status-image"
                            width={20}
                            height={20}
                          />
                        </Button>
                        <Typography sx={{ mr: 2 }}>Delete</Typography>

                        <Dialog open={dialog} onClose={() => setDialog(false)}>
                          <DialogTitle sx={{ color: "#00537A" }}>
                            Confirmation
                          </DialogTitle>
                          <DialogContent>
                            <Typography>
                              Are you sure you want to delete this patient?
                            </Typography>
                          </DialogContent>
                          <DialogActions
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: 2,
                              gap: 0,
                            }}
                          >
                            <Button
                              onClick={() => deleteList(selectedPatientId!)}
                              sx={{ paddingX: 4 }}
                              size="small"
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => setDialog(false)}
                              sx={{ paddingX: 4 }}
                              size="small"
                              variant="outlined"
                              color="primary"
                            >
                              Cancel
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </Stack>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {list.length === 0 && (
              <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",pt:10,color:"gray", height:"18px"}}>
                <Typography sx={{letterSpacing:"0.18em", fontWeight:500,textAlign: "center"}}>
                There is no list...
              </Typography>
              </Box>
            ) }
      <Box
        sx={{
          lg: { width: "30%" },
          width: "35%",
          marginTop: "13%",
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
            {remove
              ? "Patient is successfully deleted!"
              : " Patient is successfully updated!"}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
};

export default ListTable;
