import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";

export const ListItems = () => {
    const navigate = useNavigate();

    const handleCreateCourseClick = () => {
        navigate('/create-course'); // Navigate to the create course page
    };  

    const handleCourseInstanceClick = () => {
        navigate('/course-instances'); // Navigate to the create course page
    };  
    return (
        <>
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Courses
                </ListSubheader>
                <Tooltip title="Create Course" placement="right" arrow>
                    <ListItemButton
                        onClick={handleCreateCourseClick}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Course" />
                    </ListItemButton>
                </Tooltip> 
            </React.Fragment>
            <React.Fragment>
                <ListSubheader component="div" inset>
                    Course Instance
                </ListSubheader>
                <Tooltip title="Course Instances" placement="right" arrow>
                    <ListItemButton
                        onClick={handleCourseInstanceClick}
                    >
                        <ListItemIcon>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText primary="Course Instances" />
                    </ListItemButton>
                </Tooltip>
            </React.Fragment>
        </>
    );
};
