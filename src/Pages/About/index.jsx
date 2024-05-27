import React from "react";
import AboutImg from "../../assets/Utils/About.jpg";
import { chooseUs } from "../../Utils/data";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensure it only triggers once
    threshold: 0.1 // Trigger when 10% of the element is in view
  });

  return (
    <section className="w-screen py-20 font-atype">
      <div className="max-w-screen-xl m-auto">
        <h1 className="text-center text-4xl font-semibold">About</h1>
        <div className="grid grid-cols-2 py-10 gap-5">
          <div>
            <img src={AboutImg} alt="about" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-campton indent-5">
              <b className="font-atype font-semibold">PureScore</b> is an
              essential resource testing solutions provider, started with the
              goal of offering one-stop, at-home testing solutions for resources
              of vital importance to public health and wellness, such as water,
              soil, and air. In partnership with Nilawar Laboratories, a leading
              NABL-accredited laboratory for R&D and testing facility we aim to
              deliver accurate and precise results. your family
            </p>
            <p className="font-campton mt-5 indent-5">
              Order your kits from anywhere in India and receive your
              personalised PureScore kit, comprising a tailor-made purity score,
              alongside detailed test results, insightful interpretations, and
              actionable solutions aimed at safeguarding the wellness of you and
            </p>
            <p className="font-atype font-semibold mt-3">
              Discover the complete range of more specific tests for various
              segments offered through our collaborations.
              <button className="rounded-lg text-primary ml-2 underline">
                See Products
              </button>
            </p>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-center font-atype font-semibold text-3xl">
            Why Choose Us?
          </h1>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {chooseUs.map((data, i) => (
              <div key={i} className="border border-1 p-6 rounded-lg shadow-xl">
                <h1 className="font-atype font-semibold text-xl">
                  {data.heading}
                </h1>
                <p className="mt-3 font-campton">{data.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-20" ref={ref}>
          <div className="grid grid-cols-4 gap-4 mt-10 place-content-center place-items-center">
            <div>
              <h1 className="text-center font-atype text-4xl mb-3 text-primary font-semibold">
                {inView && <CountUp end={50000} duration={2} />}
              </h1>
              <p className="text-xl font-atype text-center">
                Water Samples Tested
              </p>
            </div>
            <div>
              <h1 className="text-center font-atype text-4xl mb-3 text-primary font-semibold">
                {inView && <CountUp end={500000} duration={2} />}
              </h1>
              <p className="text-xl font-atype text-center">
                Soil Samples Tested
              </p>
            </div>
            <div>
              <h1 className="text-center font-atype text-4xl mb-3 text-primary font-semibold">
                {inView && <CountUp end={250} duration={2} />}
              </h1>
              <p className="text-xl font-atype text-center">
                Custom Tests Available
              </p>
            </div>
            <div>
              <h1 className="text-center font-atype text-4xl mb-3 text-primary font-semibold">
                {inView && <CountUp end={100} duration={2} />}
              </h1>
              <p className="text-xl font-atype text-center">
                Projects Delivered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
