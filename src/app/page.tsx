"use client";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import PatientData, { PatientDataType } from "../../mock/data";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import ListTable from "@/components/Table";
import React, { useEffect, useRef, useState } from "react";
import { FormControl } from "@mui/material";
import {SubmitHandler } from "react-hook-form";
import generateID from "@/utils/generateId";
import CreateForm from "@/components/CreateForm";
import CloseIcon from "@mui/icons-material/Close";

export default function Home() {
  const [open, setOpen] = useState(false);

  const [alert, setAlert] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPatient(null);
  };

  const [tableData, setTableData] = useState<PatientDataType[]>([]);
  const [editingPatient, setEditingPatient] = useState<PatientDataType | null>(
    null
  );

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

  const [selectOne, setSelectOne] = useState<string>("");
  const [selectTwo, setSelectTwo] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessAlert]);

  const handleChangeOne = (event: SelectChangeEvent) => {
    setSelectOne(event.target.value);
  };

  const handleChangeTwo = (event: SelectChangeEvent) => {
    setSelectTwo(event.target.value);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      clearSearchInput();
    }
  };
  const clearSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
      setSearchKeyword("");
    }
  };
  const onSubmit: SubmitHandler<PatientDataType> = (data) => {
    const id = generateID();
    const icon = "/image/more.png";
    const isDone = false;

    const newPatient: PatientDataType = {
      id,
      isDone,
      name: data.name,
      status: data.status,
      pawrent: data.pawrent,
      breed: data.breed,
      gender: data.gender,
      birth: data.birth,
      phone: data.phone,
      address: `${data.address},${data.town},${data.city}`,
      icon: "/image/more.png",
    };
    setTableData((data) => [...data, newPatient]);
    handleClose();
    setShowSuccessAlert(true);
    setAlert(true);
  };
  return (
    <main>
      <Box sx={{ overflowY: "hidden" }}>
        <AppBar
          sx={{
            backgroundColor: "#54BAB9",
            paddingTop: 1,
            width: "100%",
          }}
          position="static"
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              <Image
                alt="logo"
                src={"/image/Logo.png"}
                width={50}
                height={60}
              />
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge color="error">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar src="./image/user-image.png" />
                <Typography component="div" sx={{ paddingX: 2 }}>
                  <Box sx={{ fontWeight: "regular", textAlign: "left" }}>
                    Yati
                  </Box>
                  <Box
                    sx={{
                      fontWeight: "light",
                      fontSize: 13,
                      textAlign: "left",
                    }}
                  >
                    Operator
                  </Box>
                </Typography>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Stack sx={{ bgcolor: "#F7ECDE" }}>
          <Stack sx={{ m: 2, padding: 3, bgcolor: "#ffffff" }}>
            <Typography variant="h6">
              <Box sx={{ color: "#54BAB9" }}>Patient List</Box>
            </Typography>

            <Box>
              <Stack
                direction="row"
                spacing={0}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Stack>
                  <OutlinedInput
                    value={searchKeyword}
                    onKeyDown={handleKeyDown}
                    onChange={handleSearchInput}
                    sx={{
                      height: "30px",
                      borderRadius: "16px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(34,122,161,0.5)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(34,122,161,0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(34,122,161,0.5)",
                      },
                    }}
                    placeholder="Search table"
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={clearSearchInput}>
                          <SearchIcon
                            sx={{
                              color: "#3d5afe",
                              filter: "brightness(1.5)",
                              fontSize: "20px",
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      "aria-label": "weight",
                    }}
                  />

                  <Box sx={{ my: 1 }}>
                    <FormControl size="small" sx={{ m: 1, maxWidth: 120 }}>
                      <Select
                        sx={{ borderRadius: "25px" }}
                        value={selectOne}
                        onChange={handleChangeOne}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Status All</MenuItem>
                        <MenuItem value="Allergy">Allergy</MenuItem>
                        <MenuItem value="PickyEater">Picky Eater</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl
                      size="small"
                      sx={{ m: 1, maxWidth: 120, height: 50 }}
                    >
                      <Select
                        sx={{ borderRadius: "25px" }}
                        value={selectTwo}
                        onChange={handleChangeTwo}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">Breed All</MenuItem>
                        <MenuItem value="Beagle">Beagle</MenuItem>
                        <MenuItem value="Spaniel">Spaniel</MenuItem>
                        <MenuItem value="Golden Retriever">
                          Golden Retriever
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>

                <Stack>
                  <Button
                    onClick={() => {
                      handleOpen();
                      console.log("clicked");
                    }}
                    sx={{
                      bgcolor: "#54BAB9",
                      color: "white",
                      borderColor: "#54BAB9",
                      ":hover": { backgroundColor: "#80cbc4" },
                      textTransform: "capitalize",
                      borderRadius: "15px",
                      paddingX: "0px",
                    }}
                  >
                    <AddIcon />
                    Add new patient
                  </Button>

                  {open && (
                    <CreateForm
                      formType="create"
                      handleClose={handleClose}
                      onSubmit={onSubmit}
                      showSuccessAlert={showSuccessAlert}
                      defaultValues={editingPatient || ({} as PatientDataType)}
                    />
                  )}
                  <Stack
                    direction="row"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Rows per pages :
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        color: "#54BAB9",
                        fontSize: "13px",
                        borderRadius: "15px",
                        textTransform: "capitalize",
                        m: 1,
                        width: "15px",
                        height: "30px",
                        borderColor: "#CBCBCB",
                        "&:hover": {
                          borderColor: "#CBCBCB",
                        },
                        "&.Mui-focused": {
                          borderColor: "#CBCBCB",
                        },
                      }}
                      disableElevation
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {tableData.length}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            <ListTable
              data={tableData}
              open={false}
              handleOpen={handleOpen}
              handleClose={handleClose}
              onSubmit={onSubmit}
              showSuccessAlert={showSuccessAlert}
              selectOne={selectOne}
              selectTwo={selectTwo}
              searchKeyword={searchKeyword}
            />
          </Stack>
          <Box
            position={"fixed"}
            sx={{ lg: { width: "30%" }, width: "35%", bottom: 0 }}
          >
            <Collapse in={showSuccessAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowSuccessAlert(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                Patient is successfully created!
              </Alert>
            </Collapse>
          </Box>
        </Stack>
      </Box>
    </main>
  );
}
