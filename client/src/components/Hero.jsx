import React from "react";
const Hero = () => {
  return (
    <section className="relative h-screen w-full pb-12 dark:bg-gray-90 dark:text-white">
      <div className="max_pad_container relative top-20 xs:top-30">
        <h1 className="h1 capitalize">Responsive Navbar</h1>
        <p>
          Here You can see a responsive navbar with light-dark mode as well as
          for mobile layout its full responsive
        </p>

        <button className="btn_secondary_rounded mt-12">vote for me</button>
      </div>
    </section>
  );
};

export default Hero;
