import React from 'react';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="base-layout">
      {/* TODO: Render header, navigation, and main content */}
      {children}
    </div>
  );
};

export default BaseLayout;
