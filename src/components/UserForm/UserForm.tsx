import { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface UserData {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;
}

const UserForm = () => {
    const [formData, setFormData] = useState<UserData>({
        id: uuidv4(),
        name: '',
        address: '',
        email: '',
        phone: ''
    });

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [allUserData, setAllUserData] = useState<UserData[]>(() => {
        const savedData = localStorage.getItem('userData');
        try {
            const parsedData = savedData ? JSON.parse(savedData) : [];
            return Array.isArray(parsedData) ? parsedData : [];
        } catch {
            return []; 
        }
    });

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasUnsavedChanges]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUserData = [...allUserData, formData];
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setAllUserData(updatedUserData);
        setFormData({ id: uuidv4(), name: '', address: '', email: '', phone: '' });
        setHasUnsavedChanges(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setHasUnsavedChanges(true);
    };

    const handleDelete = (id: string) => {
        const filteredData = allUserData.filter((data) => data.id !== id);
        localStorage.setItem('userData', JSON.stringify(filteredData));
        setAllUserData(filteredData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: 3,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
                User Data Form
            </Typography>

            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                fullWidth
            />
            <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                type="tel"
                fullWidth
                inputProps={{ maxLength: 10 }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!hasUnsavedChanges}
                sx={{ marginTop: 2 }}
            >
                Save
            </Button>

            {/* Display all saved user data */}
            {allUserData.length > 0 && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>All User Data:</Typography>
                    <List>
                        {allUserData.map((user) => (
                            <ListItem key={user.id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2, padding: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name: {user.name}</Typography>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>Email: {user.email}</Typography>
                                <Typography variant="body2">Phone: {user.phone}</Typography>
                                <Typography variant="body2">Address: {user.address}</Typography>
                                <Button
                                    color="error"
                                    onClick={() => handleDelete(user.id)}
                                    sx={{ alignSelf: 'center', minWidth: 30, marginTop: 2 }}
                                >
                                    Delete
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default UserForm;
