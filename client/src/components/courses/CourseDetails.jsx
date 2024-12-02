import React from "react";
import { useParams } from "react-router-dom";

// Sample course details data
const courseDetailsData = {
  1: {
    course_name: "Mastering Algebra Fundamentals",
    syllabus: "Simplifying equations, solving inequalities, and graphing linear functions.",
    instructor_bio: "Sarah Johnson is a certified math tutor with over 8 years of teaching experience. She has a knack for simplifying complex concepts and making math enjoyable.",
    prerequisites: "Basic arithmetic knowledge and a passion for learning.",
  },
  2: {
    course_name: "Introduction to Creative Writing",
    syllabus: "Developing story ideas, crafting compelling characters, and exploring different genres.",
    instructor_bio: "Mark Thompson is a published author and has been teaching creative writing workshops for the past 5 years.",
    prerequisites: "No prerequisites. Just bring your creativity and an open mind!",
  },
  3: {
    course_name: "Exploring Physics for Beginners",
    syllabus: "Newton's laws of motion, basic thermodynamics, and simple circuit analysis.",
    instructor_bio: "Dr. Emily Roberts has a PhD in Physics and 10 years of experience teaching high school and college-level courses.",
    prerequisites: "A curious mind and a calculator.",
  },
  4: {
    course_name: "SAT Prep: Math and Reading",
    syllabus: "Learn test-taking strategies, tackle common problem types, and practice with real questions.",
    instructor_bio: "David Lee is a professional test prep tutor with a 99th percentile SAT score and a track record of helping students achieve their dream scores.",
    prerequisites: "Access to SAT prep materials (provided during the course).",
  },
  5: {
    course_name: "Introduction to Public Speaking",
    syllabus: "Overcoming stage fright, crafting persuasive speeches, and mastering body language.",
    instructor_bio: "Jessica Adams is a communications expert with years of experience coaching students and professionals in public speaking.",
    prerequisites: "No prerequisites. Come with the willingness to step out of your comfort zone!",
  },
};

const CourseDetails = () => {
  const { id } = useParams(); // Retrieve the course ID from the route
  const courseDetails = courseDetailsData[id];

  // Render a loading state or error if the course is not found
  if (!courseDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-36">
        <p className="text-lg text-red-600">Error: Course not found.</p>
      </div>
    );
  }

  // Render the course details page
  return (
    <div className="container mx-auto flex items-center justify-center rounded-lg">
      <div className="mt-36 w-full bg-[#001313] p-8 shadow-md shadow-green-300/35 rounded-lg">
        <h2 className="text-3xl text-gray-100 font-bold mb-6 text-center">
          {courseDetails.course_name}
        </h2>
        <div className="mb-8">
          <h3 className="text-2xl text-gray-200 font-semibold mb-4">What Will Be Covered?</h3>
          <p className="text-gray-300 leading-relaxed">{courseDetails.syllabus}</p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl text-gray-200 font-semibold mb-4">Who Is the Instructor?</h3>
          <p className="text-gray-300 leading-relaxed">{courseDetails.instructor_bio}</p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl text-gray-200 font-semibold mb-4">What Are the Prerequisites?</h3>
          <p className="text-gray-300 leading-relaxed">{courseDetails.prerequisites}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
