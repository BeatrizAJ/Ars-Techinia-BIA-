
import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

export default function Shell({
  children,
  go,
  page,
  manager = false,
  profilePhoto = '',
}) {
  return (
    <div className="app-shell">
      <Header
        go={go}
        manager={manager}
        profilePhoto={profilePhoto}
      />

      <div className="body-shell">
        <Sidebar
          go={go}
          page={page}
          manager={manager}
        />

        <main className="main-area">
          {children}
        </main>
      </div>
    </div>
  );
}
