'use client';

import { motion } from 'framer-motion';

const SkillCard = ({ text, logo, color, onClick, filter, ...props }) => {
  const cornerLogoClass = 'h-5 w-5 sm:h-[30px] sm:w-[30px]';
  const centerLogoClass = 'h-10 w-10 sm:h-20 sm:w-20';

  return (
    <motion.div
      className="relative h-[170px] w-[100px] list-none rounded-[10px] sm:h-[275px] sm:w-[175px]"
      style={{ background: color }}
      onClick={onClick}
      {...props}
    >
      <img
        src={logo}
        alt={`${text} logo`}
        className={`absolute left-[5px] top-2.5 ${cornerLogoClass}`}
        style={filter ? { filter } : undefined}
      />

      <div className="absolute left-[5px] top-10 text-[13px] tracking-[0.5px] text-white [writing-mode:vertical-rl] sm:left-2.5 sm:top-[50px] sm:text-[20px] sm:tracking-[1.5px]">
        {text}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={logo}
          alt={`${text} logo`}
          className={centerLogoClass}
          style={filter ? { filter } : undefined}
        />
      </div>

      <img
        src={logo}
        alt={`${text} logo`}
        className={`absolute bottom-2.5 right-[5px] ${cornerLogoClass}`}
        style={filter ? { filter } : undefined}
      />

      <div className="absolute bottom-10 right-[5px] rotate-180 text-[13px] tracking-[0.5px] text-white [writing-mode:vertical-rl] sm:bottom-[50px] sm:right-2.5 sm:text-[20px] sm:tracking-[1.5px]">
        {text}
      </div>
    </motion.div>
  );
};

export default SkillCard;
