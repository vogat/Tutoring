import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import images
import course1 from "../../assets/courses-images/1.jpg";
import course2 from "../../assets/courses-images/2.jpg";
import course3 from "../../assets/courses-images/3.jpg";
import course4 from "../../assets/courses-images/4.jpg";
import course5 from "../../assets/courses-images/5.jpg";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched courses:", response.data); // Log the fetched courses
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setError("Unexpected response format");
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        setError("Error fetching purchased courses");
        console.error("Error fetching purchased courses:", error);
      }
    };

    fetchPurchasedCourses();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (courses.length === 0) {
    return <p className="text-center text-gray-200">No courses found.</p>;
  }

  // Map course names to imported images
  const imageMap = {
    "Mastering Algebra Fundamentals": course1,
    "Introduction to Creative Writing": course2,
    "Exploring Physics for Beginners": course3,
    "SAT Prep: Math and Reading": course4,
    "Introduction to Public Speaking": course5,
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course-player/${courseId}`);
  };

  return (
    <section className="py-4 flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="mt-36">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-4">
          Your Purchased Courses 🎉
        </h1>
        <p className="mb-12 text-center text-gray-300">
          Gear up your development skills to next level with these mindblowing courses
        </p>
        <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={imageMap[course.name]}
                alt={course.name}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h2
                  className="text-xl font-semibold cursor-pointer"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {course.name}
                </h2>
                <p className="text-gray-200">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyCourses;