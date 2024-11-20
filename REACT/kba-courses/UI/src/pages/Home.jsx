import React from 'react'
//import Navbar from '../components/Navbar'
import MainLayout from '../layouts/MainLayout'
import Hero from '../components/Hero'
import TopCourses from '../components/TopCourses'
import CourseGrid from '../components/CourseGrid'
import ViewCourseButton from '../components/ViewAllCoursesButton'




const Home = () => {
 
  return (
    <MainLayout>
      <Hero />
      <TopCourses />
      <CourseGrid isHome={true} />
      <ViewCourseButton/>
    </MainLayout>
  )
}

export default Home