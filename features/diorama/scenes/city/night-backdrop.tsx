import { useEffect, useRef } from 'react';
import { cityNightTint, prepareCityNight, switchCityLights } from './nightfall';

/** Bounded painting, redrawn only when the journey's scroll state changes. */
export function CityNightBackdrop({
  load,
  active,
}: {
  load: boolean;
  active: boolean;
}): JSX.Element {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const image = canvas?.previousElementSibling;
    const journey = canvas?.closest<HTMLElement>('.world-journey');
    if (!load || !canvas || !journey || !(image instanceof HTMLImageElement))
      return;
    let render: ((ending: number) => void) | undefined;
    let pending = 0;
    let previous = -1;
    const update = () => {
      const ending = Number(journey.style.getPropertyValue('--ending')) || 0;
      if (ending === previous || !render) return;
      previous = ending;
      render(ending);
    };
    const paint = () => {
      if (!image.naturalWidth) return;
      try {
        const context = canvas.getContext('2d');
        if (!context) return;
        canvas.width = Math.min(1024, image.naturalWidth);
        canvas.height = Math.round(
          (canvas.width * image.naturalHeight) / image.naturalWidth,
        );
        const source = document.createElement('canvas');
        source.width = canvas.width;
        source.height = canvas.height;
        const sourceContext = source.getContext('2d');
        if (!sourceContext) return;
        sourceContext.drawImage(image, 0, 0, source.width, source.height);
        const frame = sourceContext.getImageData(
          0,
          0,
          source.width,
          source.height,
        );
        const painting = prepareCityNight(
          frame.data.slice(),
          source.width,
          source.height,
        );
        let signature = '';
        render = ending => {
          const next = painting.groups
            .map(group => (ending >= group.stop ? '1' : '0'))
            .join('');
          if (next !== signature) {
            const off = switchCityLights(frame.data, painting, ending);
            sourceContext.putImageData(frame, 0, 0);
            signature = next;
            canvas.dataset.groupsOff = String(off);
          }
          context.globalCompositeOperation = 'source-over';
          context.drawImage(source, 0, 0);
          const tint = cityNightTint(ending);
          const rgb = (values: number[]) =>
            `rgb(${values.map(n => Math.round(n * 255)).join(',')})`;
          const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, rgb(tint.sky));
          gradient.addColorStop(0.38, rgb(tint.sky));
          gradient.addColorStop(0.51, rgb(tint.ember));
          gradient.addColorStop(0.56, rgb(tint.ember));
          gradient.addColorStop(0.65, rgb(tint.city));
          gradient.addColorStop(1, rgb(tint.city));
          context.globalCompositeOperation = 'multiply';
          context.fillStyle = gradient;
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.globalCompositeOperation = 'source-over';
          canvas.dataset.progress = ending.toFixed(3);
          canvas.dataset.ready = 'true';
        };
        previous = -1;
        update();
      } catch {
        render = undefined;
        canvas.width = 0;
        delete canvas.dataset.ready;
      }
    };
    if (image.complete) paint();
    image.addEventListener('load', paint);
    const observer = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        update();
      });
    });
    if (active)
      observer.observe(journey, {
        attributes: true,
        attributeFilter: ['style'],
      });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(pending);
      image.removeEventListener('load', paint);
    };
  }, [load, active]);
  return (
    <canvas ref={ref} className="city-night-backdrop" aria-hidden="true" />
  );
}
