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

  // Function to refresh the token
  async function refreshToken() {
    try {
      const response = await axios.post(
        "https://tutoring-vc7f.onrender.com/auth/refresh-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (error) {
      throw error;
    }
  }

  // Function to fetch purchased courses
  async function fetchPurchasedCourses() {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.get(
        "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response status:", response.status); // Log the response status
      console.log("Response headers:", response.headers); // Log the response headers

      if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
        console.log("Fetched courses:", response.data); // Log the fetched courses
        const uniqueCourses = removeDuplicates(response.data);
        setCourses(uniqueCourses);
      } else {
        console.error("Unexpected response format:", response.data);
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
      if (error.response && error.response.status === 403) {
        // Token might be expired, try refreshing it
        try {
          const token = await refreshToken();
          const response = await axios.get(
            "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Response status after token refresh:", response.status); // Log the response status after token refresh
          console.log("Response headers after token refresh:", response.headers); // Log the response headers after token refresh

          if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
            console.log("Fetched courses after token refresh:", response.data); // Log the fetched courses after token refresh
            const uniqueCourses = removeDuplicates(response.data);
            setCourses(uniqueCourses);
          } else {
            console.error("Unexpected response format:", response.data);
            setError("Unexpected response format");
          }
        } catch (refreshError) {
          setError("Error refreshing token and fetching courses");
          console.error(
            "Error refreshing token and fetching courses:",
            refreshError
          );
        }
      } else {
        setError("Error fetching purchased courses");
        console.error("Error fetching purchased courses:", error);
      }
    }
  }

  // Function to remove duplicate courses
  function removeDuplicates(courses) {
    const uniqueCourses = [];
    const courseIds = new Set();

    for (const course of courses) {
      if (!courseIds.has(course.id)) {
        uniqueCourses.push(course);
        courseIds.add(course.id);
      }
    }

    return uniqueCourses;
  }

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
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
        {courses.length === 0 ? (
          <p className="text-center text-gray-200">No courses found.</p>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default MyCourses;