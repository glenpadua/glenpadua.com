'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRandomInt } from 'utils/helpers';

const Particle = ({ text }) => {
  const [color, setColor] = useState('rgb(0, 0, 0)');
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setColor(`rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`);

    const width = Math.max(window.innerWidth - 120, 0);
    const height = Math.max(window.innerHeight - 120, 0);
    setTarget({
      x: getRandomInt(width),
      y: getRandomInt(height),
    });
  }, []);

  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={{ x: target.x, y: target.y }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="absolute left-[200px] top-[200px] flex h-[120px] w-[120px] items-center justify-center rounded-full p-2.5 text-white even:mt-10"
      style={{ backgroundColor: color }}
    >
      {text || 'Text'}
    </motion.div>
  );
};

export default Particle;
