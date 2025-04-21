import gsap from 'gsap';
import { useRef } from 'react';
import { jsxConvertor } from '../utils/convertors/jsxConvertor';
import AnimatedTitle from './animatedTitle';
import Button from './button';
import RoundedCorners from './roundedCorners';

export default function Story() {
  const frameRef = useRef<HTMLImageElement>(null);

  const onMouseLeave = () => {
    const element = frameRef.current;
    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotationX: 0,
        rotationY: 0,
        transformPerspective: 500,
        ease: 'power1.out',
      });
    }
  };

  const onMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = event;
    const element = frameRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerY) * 10;

      gsap.to(element, {
        duration: 0.3,
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 500,
        ease: 'power1.out',
      });
    }
  };

  return (
    <section id='vault' className='min-h-dvh w-screen bg-black text-blue-50'>
      <div className='flex size-full flex-col items-center py-10 pb-24'>
        <p className='font-general text-sm uppercase md:text-[10px]'>
          the multiversal ip world
        </p>

        <div className='relative size-full'>
          <AnimatedTitle
            title={jsxConvertor(`the st<b>o</b>ry of the hidden real<b>m</b>`)}
            // sectionId='#story'
            className='mt-5 pointer-events-none mix-blend-difference relative z-10'
          />
          <div className='story-img-container'>
            <div className='story-img-mask'>
              <div className='story-img-content'>
                <img
                  ref={frameRef}
                  onMouseLeave={onMouseLeave}
                  onMouseUp={onMouseLeave}
                  onMouseDown={onMouseLeave}
                  onMouseMove={onMouseMove}
                  src='/img/entrance.webp'
                  alt='entrance'
                  className='object-contain'
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>
        <div className='-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end'>
          <div className='flex h-full w-fit flex-col items-center md:items-start'>
            <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start'>
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities
            </p>
            <Button
              id='realm-button'
              title='discover prologue'
              className='mt-5'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
