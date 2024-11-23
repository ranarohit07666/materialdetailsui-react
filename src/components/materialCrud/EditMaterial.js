import { useEffect, useState } from "react";
import api from "../../Interceptor/api-interceptor";
import {
  Box,
  Typography,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const EditMaterial = () => {
  const { id } = useParams();
  const [units, setUnits] = useState([]);
  const [types, setTypes] = useState([]);
  const [referenceData, setReferenceData] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    materialName: "",
    rate: "",
    consumption: "",
    typeId: null,
    unitId: null,
    referenceId: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchMaterials = async () => {
    const response = await api.get(`/material/${id > 0 && id}`);
    setFormData({
      id: id,
      materialName: response.data.materialName,
      rate: response.data.rate,
      consumption: response.data.consumption,
      unitId: response.data.unit.id,
      typeId: response.data.types.id,
      referenceId: response.data.referenceDetail.id,
    });
  };

  const fetchUnits = async () => {
    const response = await api.get("/unit");
    setUnits(response.data);
  };

  const fetchTypes = async () => {
    const response = await api.get("/type");
    setTypes(response.data);
  };

  const fetchReferenceData = async () => {
    const response = await api.get("/reference");
    setReferenceData(response.data);
  };

  useEffect(() => {
    if (id > 0) {
      fetchMaterials();
    }
    fetchUnits();
    fetchTypes();
    fetchReferenceData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData({ ...formData, [name]: value ? value.id : null });
  };

  const handleSubmit = async () => {
    const formErrors = {};
    if (!formData.materialName) formErrors.materialName = 'Material Name is required';
    if (!formData.rate) formErrors.email = 'Rate is required';
    if (!formData.unitId) formErrors.unitId = 'Unit of measure is required';
    if (!formData.typeId) formErrors.typeId = 'Type is required';
    if (!formData.consumption) formErrors.consumption = 'consumption is required';
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      if (loading) return;
      setLoading(true);
      try {
        await api.post(`/material/`, formData);
        alert("Material saved successfully!");
        setFormData({
          id: 0,
          materialName: "",
          rate: "",
          consumption: "",
          typeId: null,
          unitId: null,
          referenceId: 0,
        });
        navigate('/reference');
      } catch (error) {
        alert("Failed to save material.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        Material
      </Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
        <TextField
          label="Material Name"
          name="materialName"
          value={formData.materialName}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.materialName}
          helperText={errors.materialName}
        />
        <TextField
          label="Rate"
          name="rate"
          type="number"
          value={formData.rate}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.rate}
          helperText={errors.rate}
        />
        <TextField
          label="Consumption"
          name="consumption"
          type="number"
          value={formData.consumption}
          onChange={handleInputChange}
          fullWidth
          error={!!errors.consumption}
          helperText={errors.consumption}
        />
        <Autocomplete
          options={types}
          fullWidth
          getOptionLabel={(option) => option.name}
          value={types.find((type) => type.id === formData.typeId) || null}
          onChange={(e, value) => handleAutocompleteChange("typeId", value)}
          renderInput={(params) => <TextField {...params} label="Type" fullWidth error={!!errors.typeId}
            helperText={errors.typeId} />}
        />
        <Autocomplete
          fullWidth
          options={units}
          getOptionLabel={(option) => option.name}
          value={units.find((unit) => unit.id === formData.unitId) || null}
          onChange={(e, value) => handleAutocompleteChange("unitId", value)}
          renderInput={(params) => <TextField {...params} label="Unit" fullWidth error={!!errors.unitId}
            helperText={errors.unitId} />}

        />
        <Autocomplete
          fullWidth
          options={referenceData}
          getOptionLabel={(option) => option.referenceNumber}
          value={referenceData.find((reference) => reference.id === formData.referenceId) || null}
          onChange={(e, value) => handleAutocompleteChange("referenceId", value)}
          renderInput={(params) => <TextField {...params} label="Reference" fullWidth />}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : id ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};
