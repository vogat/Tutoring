import React from "react";
import { useNavigate } from "react-router-dom";

// Import images
import course1 from "../../assets/courses-images/1.jpg";
import course2 from "../../assets/courses-images/2.jpg";
import course3 from "../../assets/courses-images/3.jpg";
import course4 from "../../assets/courses-images/4.jpg";
import course5 from "../../assets/courses-images/5.jpg";

const MyCourses = () => {
  const navigate = useNavigate();

  // Hardcoded courses data
  const courses = [
    {
      id: 1,
      name: "Mastering Algebra Fundamentals",
      description: "Learn the basics of algebra and build a strong mathematical foundation.",
      image: course1,
    },
    {
      id: 2,
      name: "Introduction to Creative Writing",
      description: "Unleash your creativity and start writing compelling stories.",
      image: course2,
    },
    {
      id: 3,
      name: "Exploring Physics for Beginners",
      description: "Discover the fascinating world of physics with beginner-friendly lessons.",
      image: course3,
    },
    {
      id: 4,
      name: "SAT Prep: Math and Reading",
      description: "Ace your SATs with targeted practice and expert strategies.",
      image: course4,
    },
    {
      id: 5,
      name: "Introduction to Public Speaking",
      description: "Gain confidence and learn the art of public speaking.",
      image: course5,
    },
  ];

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
          Gear up your development skills to the next level with these mindblowing courses
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
                  src={course.image}
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
