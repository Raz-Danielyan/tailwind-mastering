import React from 'react';

export const jsxConvertor = (jsx: string): React.ReactElement => {
  return (
    <>
      {jsx.split('<br />').map((line, i) => (
        <div
          key={i}
          className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
        >
          {line.split(' ').map((word: string, i) => (
            <span key={i} className='animated-word'>
              {word.split(/(<b>.*?<\/b>)/).map((part, j) => {
                if (part.startsWith('<b>')) {
                  return <b key={j}>{part.replace(/<b>|<\/b>/g, '')}</b>;
                }
                return <React.Fragment key={j}>{part}</React.Fragment>;
              })}
            </span>
          ))}
        </div>
      ))}
    </>
  );
};
