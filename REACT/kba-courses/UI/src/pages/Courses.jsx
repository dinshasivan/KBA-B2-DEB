import React from 'react'
import MainLayout from '../layouts/MainLayout'
import CourseGrid from '../components/CourseGrid'


const Courses = () => {
  return (
    <MainLayout>
        
        <CourseGrid isHome={false} />
    </MainLayout>
  )
}

export default Courses