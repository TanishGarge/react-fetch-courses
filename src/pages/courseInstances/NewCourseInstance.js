import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function NewCourseInstance() {
    const navigate = useNavigate();
    const { data: courses = [] } = useFetch("http://localhost:8080/api/courses");

    // Extract course IDs from the fetched data
    const courseOptions = courses && courses.length > 0
        ? courses.map((course) => ({
            id: course.id
        }))
        : [];

    const handleSubmit = (event) => {
        event.preventDefault();
        let year = event.currentTarget[0].value;
        let semester = event.currentTarget[2].value;
        let courseId = event.currentTarget[4].value;

        let newCourseInstance = {
            courseId,
            year,
            semester
        };
        handleCreate(newCourseInstance);
    };

    const handleCreate = async (newInstance) => {

        try {
            const response = await fetch(`http://localhost:8080/api/instances?courseId=${newInstance.courseId}&year=${newInstance.year}&semester=${newInstance.semester}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // body: JSON.stringify(newInstance),
            });
    
            if (response.ok) {
                navigate("/course-instances");

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
                        <EditCalendarOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        New Course Instance
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="year"
                                    name="year"
                                    required
                                    fullWidth
                                    id="year"
                                    label="Year"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="semester"
                                    label="Sem: 1 or 2"
                                    name="semester"
                                    autoComplete="semester"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    id="courseId"
                                    options={courseOptions}
                                    getOptionLabel={(option) => option.id}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            required
                                            fullWidth
                                            id="courseId"
                                            label="Course Id"
                                            name="courseId"
                                            autoComplete="courseId"
                                        />
                                    )}
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
