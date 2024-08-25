import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import CreateCourse from '../pages/courses/CreateCourse'
import CourseInstancesByYearAndSemester from '../pages/courseInstances/CourseInstancesByYearAndSemester'
import NewCourseInstance from '../pages/courseInstances/NewCourseInstance'


export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Dashboard />} /> 
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/course-instances" element={<CourseInstancesByYearAndSemester />} />
        <Route path="/new-course-instance" element={<NewCourseInstance />} />
      </Routes>
    </>
  )
}
