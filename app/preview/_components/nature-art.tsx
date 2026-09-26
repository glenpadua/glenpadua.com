const windows = {
  pines: '0 60 594 924',
  palm: '598 50 445 940',
  boat: '1060 350 470 450',
};

export function NatureArt({
  kind,
  className,
}: {
  kind: keyof typeof windows;
  className: string;
}): JSX.Element {
  return (
    <svg className={className} viewBox={windows[kind]} aria-hidden="true">
      <image
        href="/assets/diorama/nature-atlas.webp"
        width="1536"
        height="1024"
      />
    </svg>
  );
}
