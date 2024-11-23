import React, { useEffect, useState } from "react";
import api from "../../Interceptor/api-interceptor";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button, Stack
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ReferenceView = () => {
  const [reference, setReference] = useState();
  const role = useSelector((state) => state.auth.user.role);
  const fetchReferences = async () => {
    const response = await api.get("/reference");
    console.log(response);
    setReference(response.data);
  };
  const handleDelete = async (id) => {
    const response = await api.delete("/material/" + id);
    console.log(response);
    fetchReferences();
  };
  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <>
      {reference && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Reference Data
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" component={Link} to="/Edit" startIcon={<AddCircleOutlineTwoToneIcon />}>
                Add
              </Button>

            </Stack>
          </Typography>

          {reference.map((data) => (
            <Accordion key={data.id} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${data.id}-content`}
                id={`panel-${data.id}-header`}
              >
                <Typography variant="h6">
                  Reference Number: {data.referenceNumber}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" gutterBottom>
                  Reference Date:
                  {new Date(data.referenceDate).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Materials

                </Typography>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Material Name</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Consumption</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Edit</TableCell>
                        {role && role.toLowerCase() === 'admin' && <TableCell>Delete</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.materials.length > 0 ? (
                        data.materials.map((material, index) => (
                          <TableRow key={material.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{material.materialName}</TableCell>
                            <TableCell>{material.rate.toFixed(2)}</TableCell>
                            <TableCell>{material.consumption.toFixed(2)}</TableCell>
                            <TableCell>{material.types.name}</TableCell>
                            <TableCell>{material.unit.name}</TableCell>
                            <TableCell><Button color="inherit" component={Link} to={`/Edit/${material.id}`}>Edit</Button></TableCell>
                            {role && role.toLowerCase() === 'admin' && <TableCell><Button color="inherit" onClick={() => handleDelete(material.id)}>delete</Button></TableCell>}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No Material Data
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </>
  );
};
