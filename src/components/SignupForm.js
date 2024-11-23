import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid2 } from '@mui/material';
import { signupUser } from '../state/actions/authAction';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleName: 'User',
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.password) formErrors.password = 'Password is required';
        if (!formData.confirmPassword) formErrors.confirmPassword = 'Confirm Password is required';
        if (formData.confirmPassword !== formData.password) {
            formErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            dispatch(signupUser(formData))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2} sx={{ maxWidth: 400, margin: 'auto' }}>
                <Grid2 size={12}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="Confirm Password"
                        type="password"  
                        fullWidth
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Signup
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}

