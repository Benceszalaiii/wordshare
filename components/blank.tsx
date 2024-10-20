import React from 'react';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const Header: React.FC<HeaderProps> = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

export {Header};