import Caption from './Caption';

const ImageWithCaption = ({ slice }) => {
  const imageUrl = slice.primary.image.url;
  const imageAlt = slice.primary.image.alt;
  const caption = slice.primary.caption;

  return (
    <div className="mt-8 flex flex-col items-center">
      <img src={imageUrl} alt={imageAlt || 'Post image'} className="h-auto max-h-[500px] max-w-full" />
      <Caption caption={caption} />
    </div>
  );
};

export default ImageWithCaption;
