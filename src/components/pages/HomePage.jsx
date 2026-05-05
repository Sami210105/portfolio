import React, { useState } from 'react';
import FolderIcon from '../folders/FolderIcon';

import AboutMe    from '../folders/Aboutme';
import Connect    from '../folders/Connect';
import Music      from '../folders/Music';
import Resume     from '../folders/Resume';

import folderAbout    from '../../assets/folder-about.png';
import folderMusic    from '../../assets/folder-music.png';
import folderConnect  from '../../assets/folder-connect.png';
import folderResume   from '../../assets/folder-resume.png';

const folders = [
  { id: 'about',   label: 'About Me', icon: folderAbout,   pos: { top: '80px',  left: '60px'  } },
  { id: 'music',   label: 'Music',    icon: folderMusic,   pos: { top: '220px', left: '60px'  } },
  { id: 'connect', label: 'Connect',  icon: folderConnect, pos: { top: '220px', right: '60px' } },
  { id: 'resume',  label: 'Resume',   icon: folderResume,  pos: { top: '340px', right: '60px' } },
];

const HomePage = () => {
  const [openWindow, setOpenWindow] = useState('about');
  const close = () => setOpenWindow(null);

  const renderWindow = () => {
    switch (openWindow) {
      case 'about':    return <AboutMe  onClose={close} />;
      case 'music':    return <Music    onClose={close} />;
      case 'connect':  return <Connect  onClose={close} />;
      case 'resume':   return <Resume   onClose={close} />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {folders.map(f => (
        <div key={f.id} className="absolute" style={f.pos}>
          <FolderIcon
            label={f.label}
            icon={f.icon}
            onClick={() => setOpenWindow(f.id)}
          />
        </div>
      ))}

      {openWindow && (
        <>
          <div className="fixed inset-0" onClick={close} />
          {renderWindow()}
        </>
      )}
    </div>
  );
};

export default HomePage;