import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { PatientDataType } from "../../mock/data";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
interface EditModalProps {
  handleClose: () => void;
  onSubmit: SubmitHandler<PatientDataType>;
  defaultValues?: PatientDataType;
  showSuccessAlert?: boolean;
  data?: PatientDataType;
  list?: PatientDataType[] | undefined;
  setLists?: React.Dispatch<React.SetStateAction<PatientDataType[]>>;
  updateList?: (updateData: PatientDataType | undefined) => void;
  setAlertType: React.Dispatch<
    React.SetStateAction<"delete" | "update" | null>
  >;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditModal: FC<EditModalProps> = ({
  handleClose,
  onSubmit,
  data,
  list,
  setLists,
  setAlert,
  updateList,
  setAlertType,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const { control, handleSubmit, reset, setValue } = useForm<PatientDataType>({
    defaultValues: {
      gender: "female",
      city: "Yangon",
      status: "Food Allergy",
      breed: "Beagle",
      town: "Hlaing",
    },
  });

  const handeFormSubmit: SubmitHandler<PatientDataType> = (data) => {
    const updatedList: PatientDataType[] | undefined = list?.map((patient) => {
      if (patient.id === data.id) {
        const updatedAddress = data.address ? data.address.split(",")[0] : "";
        const updatedCity = data.address ? data.address.split(",")[1] : "";
        const updatedTown = data.address ? data.address.split(",")[2] : "";

        reset({
          id: data.id,
          name: data.name,
          pawrent: data.pawrent,
          gender: data.gender,
          phone: data.phone,
          status: data.status,
          breed: data.breed,
          birth: data.birth,
          address: updatedAddress,
          town: updatedCity,
          city: updatedTown,
          icon: "/image/more.png",
        });
        setLists?.(list?.filter((patient) => patient.id !== data.id));
        updateList?.(data);
        return data;
      } else {
        return patient;
      }
    });
    setLists?.(updatedList!);
    onSubmit(data);
    setAlertType("update");
    handleClose();
    setAlert(true);
    reset();
  };

  useEffect(() => {
    if (data) {
      const updatedAddress = data.address ? data.address.split(",")[0] : "";
      const updatedCity = data.address ? data.address.split(",")[1] : "";
      const updatedTown = data.address ? data.address.split(",")[2] : "";

      reset({
        id: data.id,
        name: data.name,
        pawrent: data.pawrent,
        gender: data.gender,
        phone: data.phone,
        status: data.status,
        breed: data.breed,
        birth: data.birth,
        address: updatedAddress,
        town: updatedCity,
        city: updatedTown,
        icon: "/image/more.png",
      });
    }
  }, [data]);

  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 0 }}
        >
          <CloseOutlinedIcon sx={{ color: "#212121" }} />
        </Button>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
          color="#54BAB9"
        >
          Edit Patient
        </Typography>
        <Typography
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="13px"
          color="black"
        >
          Enter new patient informatiion below
        </Typography>

        <form onSubmit={handleSubmit(handeFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Pet Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <TextField {...field} size="small" />}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Pawrent</FormLabel>
                <Controller
                  name="pawrent"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} name="pawrent" size="small" />
                  )}
                />
              </FormControl>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      name="gender"
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Contact Phone No.</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => <TextField {...field} size="small" />}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>City</FormLabel>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="please choose city"
                      size="small"
                    >
                      <MenuItem value="Yangon">Yangon</MenuItem>
                      <MenuItem value="Manadalay">Manadalay</MenuItem>
                      <MenuItem value="Pago">Pago</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <FormLabel>Status</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="please choose city"
                      size="small"
                    >
                      <MenuItem value="Food Allergy">Food Allergy</MenuItem>
                      <MenuItem value="Picky Eater">Picky Eater</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Breed</FormLabel>
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="please choose city"
                      size="small"
                    >
                      <MenuItem value="Beagle">Beagle</MenuItem>
                      <MenuItem value="Spaniel">Spaniel</MenuItem>
                      <MenuItem value="Golden Retriever">
                        Golden Retriever
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Date of Birth</FormLabel>
                <Controller
                  name="birth"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="date" size="small"></TextField>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Address</FormLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <TextField {...field} size="small" />}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel>Township</FormLabel>
                <Controller
                  name="town"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="please choose city"
                      size="small"
                    >
                      <MenuItem value="Hlaing">Hlaing</MenuItem>
                      <MenuItem value="SouthOkkalapa">SouthOkkalapa</MenuItem>
                      <MenuItem value="NorthOkkalapa">NorthOkkalapa</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>

        <Stack
          direction="row"
          spacing={2}
          sx={{ paddingY: 2 }}
          justifyContent="center"
          alignContent="center"
        >
          <Button
            type="submit"
            onClick={handleSubmit(handeFormSubmit)}
            variant="contained"
          >
            Edit
          </Button>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ color: "#000000" }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditModal;
