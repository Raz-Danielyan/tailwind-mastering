import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import ArrowUpIcon from '../utils/svg/arrowUp';
import Button from './button';

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleAudioIndicator = () => {
    if (isPlaying) {
      audioElementRef.current?.pause();
    } else if (audioElementRef.current) {
      audioElementRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.remove('floating-nav');
      } else if (window.scrollY > lastScrollY) {
        setIsNavVisible(false);
        navContainerRef.current?.classList.add('floating-nav');
      } else if (window.scrollY < lastScrollY) {
        setIsNavVisible(true);
        navContainerRef.current?.classList.add('floating-nav');
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
    >
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          <div className='flex items-center gap-7'>
            <img src='/img/logo.png' alt='Logo' className='w-10' />
            <Button
              id='product-button'
              title='Products'
              rightIcon={<ArrowUpIcon />}
              className='bg-blue-50 md:flex hidden items-center justify-center gap-1'
            />
          </div>

          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className='nav-hover-btn'
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className='cursor-pointer ml-10 flex items-center space-x-0.5 h-10'
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className='hidden'
                src='/audio/loop.mp3'
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isPlaying ? 'active' : ''}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
