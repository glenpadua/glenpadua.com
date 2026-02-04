'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Tag from 'components/Tag';
import { portfolioLinkIconMap } from 'utils/iconMaps';
import { cn } from 'lib/utils';

const getVariants = () => {
  return {
    open: {
      top: 0,
      left: 0,
      width: '100%',
      height: 'auto',
      borderRadius: '0',
      transition: {
        ease: 'easeOut',
        duration: 0.5,
      },
    },
    closed: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      transition: {
        duration: 0.01,
      },
    },
  };
};

const FolioBlock = ({ portfolio, setCurrentlyOpen }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setCurrentlyOpen(portfolio.id);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentlyOpen(0);
    setOpen(false);
  };

  const links = portfolio.links || [];

  return (
    <>
      <motion.div
        variants={getVariants()}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        onClick={handleClick}
        whileHover={{ scale: isOpen ? 1 : 1.1 }}
        className={cn(
          'relative mb-[30px] flex cursor-pointer flex-col items-center justify-center bg-white p-0 sm:mr-5 min-[1100px]:mr-10',
          isOpen &&
            'absolute z-[100] mr-0 cursor-default items-start justify-start p-5'
        )}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
          >
            <button
              type="button"
              onClick={event => {
                event.stopPropagation();
                handleClose();
              }}
              aria-label={`Close ${portfolio.title}`}
              className="absolute -right-2.5 -top-2.5 z-[1000] cursor-pointer text-xl text-black transition-opacity hover:opacity-70"
            >
              <FaTimes />
            </button>
          </motion.div>
        )}

        <motion.div
          className="flex flex-col"
          variants={{
            open: {
              alignItems: 'initial',
            },
            closed: {
              alignItems: 'center',
            },
          }}
        >
          <div className="mb-[0.3em] flex items-center">
            <h2 className="text-[1.4em] font-light">{portfolio.title}</h2>
            {links.length > 0 &&
              isOpen &&
              links.map(link => {
                const Icon = portfolioLinkIconMap[link.iconKey];

                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="pl-[10px] text-base text-black"
                  >
                    {Icon ? <Icon /> : null}
                  </a>
                );
              })}
          </div>
          <motion.div
            className="flex w-[95%] flex-wrap"
            variants={{
              open: {
                justifyContent: 'initial',
              },
              closed: {
                justifyContent: 'center',
              },
            }}
          >
            {portfolio.tags.map((tag, index) => (
              <div key={`${tag.name}-${index}`} className="px-[3px] pb-2">
                <Tag color={tag.color}>{tag.name}</Tag>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {isOpen && (
          <div className="mt-5 w-full max-w-[850px] text-[0.95em] font-light leading-relaxed text-black/90">
            {portfolio.summary && <p className="mb-4">{portfolio.summary}</p>}
            {portfolio.sections?.map(section => (
              <div key={section.heading} className="mb-4">
                <h3 className="mb-2 text-base font-medium">{section.heading}</h3>
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.heading}-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      {/* To take up the space when it's open */}
      <div
        className={cn(
          'relative h-[140px] w-[140px] rounded-full p-0 md:h-[200px] md:w-[200px]',
          isOpen ? 'block' : 'hidden'
        )}
      />
    </>
  );
};

export default FolioBlock;
