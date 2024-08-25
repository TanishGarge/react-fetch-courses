import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Autocomplete, IconButton, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function CourseInstancesByYearAndSemester() {


    const [courseInstances, setCourseInstances] = React.useState([]);
    const [year, setYear] = React.useState(2021);
    const [semester, setSemester] = React.useState(1);

    const {data: instances, isLoading, setUrl, error} = useFetch(null);

    function handleSemesterChange( newSemester) {
        setSemester(newSemester?.label);
    }

    function handleYearChange(event) {
        setYear(event.target.value);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [instance, setInstance] = React.useState(null);
        
    const handleSubmit = (event) => {
        event.preventDefault();
        setUrl(`http://localhost:8080/api/instances/${year}/${semester}`);
    };     
    
    const handleCreate = (event) => {
        console.log(event);
    }

    const semesterOptions = [
        {label: "1"},
        {label: "2"}
    ];

    React.useEffect(() => {
        setUrl(`http://localhost:8080/api/instances/${year}/${semester}`);
    }, [year, semester, setUrl]);

    const handleDelete = async (year, semester, courseId) => {
        console.log("Handle Delete clicked");
        try {
            const yearNumber = Number(year);
            const semesterNumber = Number(semester);
            const response = await fetch(`http://localhost:8080/api/instances/${yearNumber}/${semesterNumber}/${courseId}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                alert("Instance deleted successfully");
    
                // Update local state to remove the deleted instance
                setCourseInstances(prevInstances =>
                    prevInstances.filter(instance => instance.course.id !== courseId)
                );
            } else {
                const errorText = await response.text();
                console.error(`Failed to delete instance: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error("Error deleting instance:", error);
        }
    };

    function handleInstance(instance) {
        setInstance(instance);
    }
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    
    return (
        <>
        
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
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="year"
                                    name="year"
                                    required
                                    fullWidth
                                    id="year"
                                    label="Year"
                                    value={year}
                                    onChange={handleYearChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                            <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={semesterOptions}
                                    sx={{ width: 125 }}
                                    value={semesterOptions.find(option => option.label === semester) || null}
                                    onChange={handleSemesterChange}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Semester" />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSubmit}
                                    // sx={{ mt:  }}
                                >
                                    List Instances
                                </Button>
                            </Grid>
                        </Grid>
                        <Link to="/new-course-instance">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleCreate}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            
                                Add Instance
                            
                        </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {instance && instance.course.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {instance && instance.course.description}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {instance && instance.year} - {instance && instance.semester} - {instance && instance.course.courseCode}
                    </Typography>
                </Box>
            </Modal>
        <React.Fragment>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Course Title</TableCell>
                            <TableCell align="center">Year-Sem</TableCell>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instances &&
                            instances.map((instance) => (
                                <TableRow key={instance.id}>
                                    <TableCell align="left">
                                        {instance.course.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {instance.year} - {instance.semester}
                                    </TableCell>
                                    <TableCell align="center">
                                        {instance.course.courseCode}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="search"
                                            size="small"
                                            onClick={() => {
                                                handleInstance(instance);
                                                handleOpen();
                                            }}
                                        >
                                            <SearchTwoToneIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => handleDelete(instance.year, instance.semester, instance.course.id)}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        </>
    );
}
