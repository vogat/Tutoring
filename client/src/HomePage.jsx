import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./assets/home-image.jpeg";
import Jane from "./assets/testimonials-images/jane.jpg";
import Chris from "./assets/testimonials-images/chris.jpg";
import Leslie from "./assets/testimonials-images/Leslie.jpg";
import Mike from "./assets/testimonials-images/mike.jpg";

const testimonials = [
  {
    id: 1,
    text: "These tutoring sessions have been invaluable for me. I've improved my grades significantly! Highly recommend this service. 🥰",
    author: "Jane Steiner",
    title: "High School Student",
    imageUrl: Jane,
  },
  {
    id: 2,
    text: "The one-on-one tutoring helped me ace my calculus exams. The instructors explain concepts so clearly!",
    author: "Chris Ambrose",
    title: "College Freshman",
    imageUrl: Chris,
  },
  {
    id: 3,
    text: "Thanks to these tutoring sessions, I finally understand chemistry. The personalized approach made all the difference.",
    author: "Leslie Winn",
    title: "High School Senior",
    imageUrl: Leslie,
  },
  {
    id: 4,
    text: "I can't believe how much progress I've made in physics! The tutors are patient and really knowledgeable.",
    author: "Mike Winn",
    title: "College Sophomore",
    imageUrl: Mike,
  },
];

const MainPage = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        {/* Welcome Page */}
        <div className="flex flex-col justify-center items-center bg-style py-48 px-10"> 
          <div className="text-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-100 ring-1 ring-gray-300/50 hover:ring-gray-300/70">
                Check out our free learning resources.{" "}
                <Link to="/blogs" className="font-semibold text-blue-300">
                  <span aria-hidden="true" className="absolute inset-0 " />
                  Explore Now <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <h1 className="text-3xl text-gray-100 font-extrabold sm:text-6xl">
              Welcome to,
              <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                LearnConnect{" "}
              </span>
              !
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-200">
              Achieve your academic goals with our tailored tutoring services. We’re here to support your learning journey.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded-full border text-white hover:text-black border-blue-300  px-12 py-3 text-sm font-medium hover:bg-blue-300 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                to="/blogs"
              >
                Explore Resources
              </Link>

              <Link
                className="block w-full rounded-full border border-blue-300 px-12 py-3 text-sm font-medium text-white hover:text-black hover:bg-blue-300 focus:outline-none focus:ring sm:w-auto"
                to="/classes"
              >
                View Classes
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-xl shadow-md shadow-blue-300 max-w-5xl mx-auto mt-24">
            <Link to="/courses">
              <img
                src={backgroundImage}
                alt="Tutoring Services"
                className="h-auto max-w-full rounded-xl"
              />
            </Link>
          </div>
        </div>

        {/* About LearnConnect */}
        <div className="my-24 max-w-5xl mx-auto px-10">
          <div className="mx-auto py-12">
            <div className="text-center">
              <div className="text-sm font-bold tracking-wider text-blue-300 uppercase">
                Get to know us
              </div>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-6xl py-4">
                What is{" "}
                <span className="bg-gradient-to-r from-blue-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  LearnConnect{" "}
                </span>
                ?
              </p>
              <p className="mt-4 max-w-2xl text-lg text-gray-200 lg:mx-auto">
                LearnConnect is a tutoring platform dedicated to helping students succeed. Our experienced tutors provide personalized support across various subjects.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative bg-[#001313] shadow-sm shadow-blue-300 md:px-8 rounded-2xl md:py-8 hover:shadow-blue-300 transform transition-transform duration-300 hover:scale-105 p-4 text-xl">
                  1. LearnConnect offers tutoring in subjects like math, science, and more, tailored to fit your academic needs.
                </div>

                <div className="relative bg-[#001313] shadow-sm shadow-blue-300 md:px-8 rounded-2xl md:py-8 hover:shadow-blue-300 transform transition-transform duration-300 hover:scale-105 p-4 text-xl">
                  2. We provide flexible options, including both one-on-one and group sessions, to help you reach your goals.
                </div>

                <div className="relative bg-[#001313] shadow-sm shadow-blue-300 md:px-8 rounded-2xl md:py-8 hover:shadow-blue-300 transform transition-transform duration-300 hover:scale-105 p-4 text-xl">
                  3. Our tutors are experts in their fields and passionate about teaching.
                </div>

                <div className="relative bg-[#001313] shadow-sm shadow-blue-300 md:px-8 rounded-2xl md:py-8 hover:shadow-blue-300 transform transition-transform duration-300 hover:scale-105 p-4 text-xl">
                  4. Our mission is to help you excel academically and build confidence in your learning abilities.
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="my-5 max-w-5xl mx-auto px-10">
          <div className="text-center">
            <div className="text-sm font-bold tracking-wider text-blue-300 py-4 uppercase">
              Testimonials
            </div>
            <h2 className="py-4 text-3xl font-bold leading-snug tracking-tight text-gray-200 lg:leading-tight lg:text-4xl">
              Here's what our Students have to say...
            </h2>
            <p className="py-4 text-lg leading-normal lg:text-xl xl:text-xl text-gray-300">
              See what our students say about their tutoring experiences and the progress they’ve made.
            </p>
          </div>
          <div className="mx-auto my-10">
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id}>
                  <div className="flex flex-col justify-between w-full h-full px-6 py-6 bg-[#001313] shadow-sm shadow-blue-300 md:px-8 rounded-2xl md:py-8 hover:shadow-blue-300 transform transition-transform duration-300 hover:scale-105">
                    <p className="text-xl leading-normal text-gray-300">
                      {testimonial.text}
                    </p>
                    <div className="flex items-center mt-8 space-x-3">
                      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                        <img
                          alt="Avatar"
                          src={testimonial.imageUrl}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-gray-200">
                          {testimonial.author}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
