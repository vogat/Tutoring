import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import images
import course1 from "../../assets/courses-images/1.jpg";
import course2 from "../../assets/courses-images/2.jpg";
import course3 from "../../assets/courses-images/3.jpg";
import course4 from "../../assets/courses-images/4.jpg";
import course5 from "../../assets/courses-images/5.jpg";

const MyCourses = () => {
  const [purchasedCourseIds, setPurchasedCourseIds] = useState([]);
  const navigate = useNavigate();

  // Hardcoded list of all available courses
  const allCourses = [
    { id: 1, name: "Mastering Algebra Fundamentals", description: "Learn the fundamentals of algebra." },
    { id: 2, name: "Introduction to Creative Writing", description: "Explore the basics of creative writing." },
    { id: 3, name: "Exploring Physics for Beginners", description: "Understand the basics of physics." },
    { id: 4, name: "SAT Prep: Math and Reading", description: "Prepare for the SAT with math and reading practice." },
    { id: 5, name: "Introduction to Public Speaking", description: "Learn the essentials of public speaking." },
  ];

  // Map course names to imported images
  const imageMap = {
    "Mastering Algebra Fundamentals": course1,
    "Introduction to Creative Writing": course2,
    "Exploring Physics for Beginners": course3,
    "SAT Prep: Math and Reading": course4,
    "Introduction to Public Speaking": course5,
  };

  // Function to fetch purchased course IDs
  async function fetchPurchasedCourses() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://tutoring-vc7f.onrender.com/purchased/purchased-courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const ids = data.map((course) => course.id);
        setPurchasedCourseIds(ids);
      } else {
        console.error("Failed to fetch purchased courses");
      }
    } catch (error) {
      console.error("Error fetching purchased courses:", error);
    }
  }

  // Fetch purchased courses on mount
  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  // Filter hardcoded courses based on purchased course IDs
  const purchasedCourses = allCourses.filter((course) =>
    purchasedCourseIds.includes(course.id)
  );

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
          Gear up your development skills to the next level with these mind-blowing courses
        </p>
        {purchasedCourses.length === 0 ? (
          <p className="text-center text-gray-200">No courses found.</p>
        ) : (
          <div className="md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {purchasedCourses.map((course) => (
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
