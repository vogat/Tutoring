import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const uniqueCourses = removeDuplicates(response.data);
      setCourses(uniqueCourses);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        try {
          token = await refreshToken();
          const response = await axios.get(
            "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const uniqueCourses = removeDuplicates(response.data);
          setCourses(uniqueCourses);
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
          Gear up your development skills to the next level with these mind-blowing courses.
        </p>
        {courses.length === 0 ? (
          <p className="text-center text-gray-200">No courses found.</p>
        ) : (
          <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {courses.map((course) => (
              <div
                className="bg-[#001313] overflow-hidden text-green-300 hover:text-green-400 shadow-sm shadow-green-300 rounded-sm hover:shadow-green-300 transform transition-transform duration-300 hover:scale-105"
                key={course.id}
              >
                <img
                  src={course.imageUrl}
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
                  <p className="text-gray-200">{course.description || "No description available."}</p>
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
