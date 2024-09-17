import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { PatientDataType } from "../../mock/data";

interface ModalsProps {
  id?: string | undefined;
  opened: boolean;
  anchorEl: HTMLElement | null;
  handleClosed: () => void;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  list ?: PatientDataType[];
  setLists ?: React.Dispatch<React.SetStateAction<PatientDataType[]>>;
  selectedPatientData: PatientDataType| null;
  setAlertType: React.Dispatch<React.SetStateAction<"delete" | "update" | null>>;
}

const Modals: React.FC<ModalsProps> = ({
  opened,
  anchorEl,
  handleClosed,
  setAlert,
  setEditModal,
  setAlertType,
  selectedPatientData,
  list,
  setLists
}) => {
  const [dialog, setDialog] = useState(false);

  const deleteList = (selectedPatientData: PatientDataType ) => {
    const updatedList = list?.filter((patient) => patient.id !== selectedPatientData.id);
    setLists?.(updatedList!);
    setAlertType("delete");
    setDialog(false);
    setAlert(true);
  };

  const handleEdit = () => {
    setEditModal(true);
    handleClosed();
  }

  return (
    <div>
      <Popover
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
            onClick={handleEdit}
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
              onClick={() => {
                setDialog(true);
              }}
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
              <DialogTitle sx={{ color: "#00537A" }}>Confirmation</DialogTitle>
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
                  onClick={() => deleteList(selectedPatientData!)}
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
    </div>
  );
};

export default Modals;
