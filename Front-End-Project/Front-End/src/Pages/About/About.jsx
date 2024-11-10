import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-10 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-red-600 dark:text-red-400 mb-8 text-center">About ThinAirbnb</h1>
      <div className="mb-10 flex justify-center">
        <img
          className="w-full max-w-4xl h-auto rounded-lg shadow-xl"
          src="https://www.woodworkingnetwork.com/sites/default/files/airbnb-hq-6.jpg"
          alt="ThinAirbnb Office Space"
        />
      </div>
      <div className="space-y-6 text-lg leading-relaxed">
        <p>
          Welcome to <span className="font-bold">ThinAirbnb</span>, where comfort, community, and creativity meet. We offer more than just accommodations—we offer experiences that inspire you to dream, create, and connect. ThinAirbnb is a place designed for those who seek more than just a bed to sleep in; it’s for those who wish to be part of a community that values growth, innovation, and collaboration.
        </p>
        <p>
          Our mission is to redefine the idea of travel and work by providing unique, stylish spaces that foster productivity and creativity. Whether you're a digital nomad, an entrepreneur, or someone who simply needs an inspiring getaway, ThinAirbnb has been crafted to provide you with the perfect balance between comfort and creativity.
        </p>
        <p className="text-2xl font-semibold text-red-600 dark:text-red-400 text-center">
          Why Choose ThinAirbnb?
        </p>
        <ul className="list-disc list-inside space-y-4">
          <li>
            <span className="font-bold">Stunning Design:</span> Each of our spaces is meticulously designed to offer a modern yet cozy aesthetic, perfect for both relaxation and focused work.
          </li>
          <li>
            <span className="font-bold">High-Speed Connectivity:</span> Enjoy high-speed internet and ergonomic workstations, ensuring you can work efficiently and comfortably.
          </li>
          <li>
            <span className="font-bold">Community Connection:</span> ThinAirbnb isn’t just about where you stay—it’s about who you meet. Engage with like-minded individuals, and collaborate on projects.
          </li>
          <li>
            <span className="font-bold">Global Reach:</span> Find beautiful, creative spaces across the globe, making it easy to travel, work, and experience new cultures without missing a beat.
          </li>
          <li>
            <span className="font-bold">Trusted and Secure:</span> Rest easy knowing that all our listings are verified for quality and safety, ensuring your stay is secure and comfortable.
          </li>
        </ul>
        <p>
          At ThinAirbnb, we believe that where you stay should not only support your journey but also inspire it. Join our community today and discover a new way to travel, work, and live.
        </p>
      </div>
    </div>
  );
};

export default About;
