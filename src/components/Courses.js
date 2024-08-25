import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import useFetch from "../hooks/useFetch";
import { useDynamicTitle } from "../hooks/useDynamicTitle";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function Courses() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [course, setCourse] = React.useState(null);
    const handleNewCourse = (newCourse) => setCourse(newCourse);
    const BASE_API_PATH = "http://localhost:8080/api/";
    const [courses, setCourses] = React.useState([]);

    const {
        data,
    } = useFetch(BASE_API_PATH + "courses");

    React.useEffect(() => {
        if(data) {
            setCourses(data);
        }
    }, [data]);

    useDynamicTitle("Dashboard");

    const handleDelete = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete");
            }
            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    return (
        <>
            {course && (
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
                            {course.title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {course.description}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {course.courseCode}
                        </Typography>
                    </Box>
                </Modal>
            )}

            <React.Fragment>
                <Title>Courses</Title>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Course Title</TableCell>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses &&
                            courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell align="left">
                                        {course.title}
                                    </TableCell>
                                    <TableCell align="center">
                                        {course.courseCode}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => {
                                                handleNewCourse(course);
                                                handleOpen();
                                            }}
                                        >
                                            <SearchTwoToneIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={() => {handleDelete(course.id)}}
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
