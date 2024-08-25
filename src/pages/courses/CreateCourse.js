import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';

const defaultTheme = createTheme();

export default function CreateCourse() {

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        let title = event.currentTarget[0].value;
        let description = event.currentTarget[2].value;
        let courseCode = event.currentTarget[4].value;

        let newCourse = {
            title,
            description,
            courseCode
        }

        handleCreate(newCourse)
    };

    const handleCreate = async (newCourse) => {

        try {
            const response = await fetch("http://localhost:8080/api/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCourse), // Send course data as JSON
            });
    
            if (response.ok) {
                navigate("/");

            } else {
                console.error("Failed to create course");
            }
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <ImportContactsOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Course
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="course-title"
                                    name="courseTitle"
                                    required
                                    fullWidth
                                    id="courseTitle"
                                    label="Title"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="dexcription"
                                    label="description"
                                    name="description"
                                    autoComplete="description"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="code"
                                    label="code"
                                    type="code"
                                    id="code"
                                    autoComplete="code"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create 
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
