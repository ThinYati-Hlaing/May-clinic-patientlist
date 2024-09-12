// import React, { useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import {Box, Collapse, IconButton, Stack } from "@mui/material";
// import { AddBox } from "@mui/icons-material";

// interface AlertProps {
//   showSuccessAlert: boolean,
//   setShowSuccessAlert: boolean,
// }
// const Alert = ({showSuccessAlert,setShowSuccessAlert})> => {
//   // const [showSuccessAlert, setShowSuccessAlert] = useState(false);

//   return (
//       <Box sx={{ width: "30%", marginTop: "13%", md: { width: "40px" } }}>
//         <Collapse in={showSuccessAlert}>
//           <Alert
//             sx={{ width: "30px" }}
//             action={
//               <IconButton
//                 aria-label="close"
//                 color="inherit"
//                 size="small"
//                 onClick={() => setShowSuccessAlert(false)}
//               >
//                 <CloseIcon fontSize="inherit" />
//               </IconButton>
//             }
//             sx={{ mb: 2 }}
//           >
//             Patient is successfully created!
//           </Alert>
//         </Collapse>
//       </Box>
//   );
// };

// export default Alert;
