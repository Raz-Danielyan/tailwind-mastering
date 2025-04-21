import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type animatedTitleProps = {
  title: React.ReactElement;
  className?: string;
};

export default function AnimatedTitle({
  title,
  className,
}: animatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      });
      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.out',
        stagger: 0.02,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${className}`}>
      {title}
    </div>
  );
}
