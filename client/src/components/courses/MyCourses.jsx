import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import course1 from "../../assets/courses-images/1.jpg";
import course2 from "../../assets/courses-images/2.jpg";
import course3 from "../../assets/courses-images/3.jpg";
import course4 from "../../assets/courses-images/4.jpg";
import course5 from "../../assets/courses-images/5.jpg";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const defaultImage = "path/to/default/image.jpg";

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "https://tutoring-vc7f.onrender.com/auth/refresh-token",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      return newToken;
    } catch (err) {
      console.error("Token refresh failed:", err);
      throw err;
    }
  };

  const fetchPurchasedCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const courses = Array.isArray(response.data) ? response.data : [];
      setCourses(removeDuplicates(courses));
    } catch (error) {
      if (error.response?.status === 403) {
        try {
          const newToken = await refreshToken();
          const response = await axios.get(
            "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
            { headers: { Authorization: `Bearer ${newToken}` } }
          );
          const courses = Array.isArray(response.data) ? response.data : [];
          setCourses(removeDuplicates(courses));
        } catch (refreshError) {
          console.error("Failed after refreshing token:", refreshError);
          setError("Session expired, please log in again.");
          navigate("/login");
        }
      } else {
        console.error("API fetch error:", error);
        setError("Failed to load courses. Try again later.");
      }
    }
  };

  const removeDuplicates = (courses) => {
    const courseIds = new Set();
    return courses.filter((course) => {
      if (courseIds.has(course.id)) return false;
      courseIds.add(course.id);
      return true;
    });
  };

  const getImage = (courseName) =>
    ({
      "Mastering Algebra Fundamentals": course1,
      "Introduction to Creative Writing": course2,
      "Exploring Physics for Beginners": course3,
      "SAT Prep: Math and Reading": course4,
      "Introduction to Public Speaking": course5,
    }[courseName] || defaultImage);

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  return (
    <section className="py-4 flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="mt-36">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-4">
          Your Purchased Courses 🎉
        </h1>
        <p className="mb-12 text-center text-gray-300">
          Gear up your development skills to next level with these mindblowing
          courses
        </p>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-200">
            No courses found. Check your purchases or contact support.
          </p>
        ) : (
          <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={getImage(course.name)}
                  alt={course.name}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h2
                    className="text-xl font-semibold cursor-pointer"
                    onClick={() => navigate(`/course-player/${course.id}`)}
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
