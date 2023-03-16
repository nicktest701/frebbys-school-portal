import React from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "../../config/particlesOption";

const CustomParticle = () => {
  const particlesInit = async (main) => {
    //console.log(main);
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
    />
  );
};

export default CustomParticle;
