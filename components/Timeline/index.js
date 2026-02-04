import { cn } from 'lib/utils';

const Timeline = ({ items }) => (
  <div className="relative mx-auto max-w-[1200px]">
    <div className="timeline-line absolute bottom-0 left-3 top-0 w-[6px] md:left-1/2 md:-translate-x-1/2" />
    {items.map((item, index) => {
      const isLeft = index % 2 === 0;

      return (
        <div
          key={`${item.title}-${item.date}-${index}`}
          className={cn(
            'relative mb-4 w-full pl-12 pr-3 md:mb-0 md:w-1/2 md:px-10',
            isLeft ? 'md:left-0' : 'md:left-1/2'
          )}
        >
          <div className="relative rounded-md bg-white p-5 shadow-sm">
            <h3 className="mb-2.5 text-base font-normal">{item.title}</h3>
            <p className="text-[0.8em] font-light leading-[1.4]">{item.desc}</p>
            <div
              className={cn(
                'absolute top-[15px] h-[25px] w-[25px] rounded-full border-4 border-[#ff9f55] bg-white',
                'left-[-34px] md:left-auto',
                isLeft ? 'md:-right-[17px]' : 'md:-left-4'
              )}
            />
          </div>
          <div
            className={cn(
              'mt-1 text-[0.85em] opacity-50 md:absolute md:top-6 md:mt-0',
              isLeft ? 'md:-right-[95px]' : 'md:-left-[95px] md:text-right'
            )}
          >
            {item.date}
          </div>
        </div>
      );
    })}
  </div>
);

export default Timeline;
