import React, { useState } from 'react';
import { TextField, Button, Grid2 } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../state/actions/authAction';

export const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = {};
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            await dispatch(login(formData));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2} sx={{ maxWidth: 400, margin: 'auto' }}>
                <Grid2 size={12}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>

                </Grid2>
            </Grid2>
        </form>
    );
};

