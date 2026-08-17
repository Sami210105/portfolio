import React, { useState } from 'react';
import FolderIcon from '../folders/FolderIcon';
import Panda from '../folders/Panda';
import StickyNote from '../folders/StickyNote';

import AboutMe    from '../folders/Aboutme';
import Connect    from '../folders/Connect';
import Music      from '../folders/Music';
import Resume     from '../folders/Resume';
import Tools      from '../folders/Tools';

import folderAbout    from '../../assets/folder-about.png';
import folderMusic    from '../../assets/folder-music.png';
import folderConnect  from '../../assets/folder-connect.png';
import folderResume   from '../../assets/folder-resume.png';
import folderTools from '../../assets/folder-resume.png';

const folders = [
  { id: 'about',   label: 'About Me', icon: folderAbout,   pos: { top: '80px',  left: '60px'  } },
  { id: 'music',   label: 'My Playlist',    icon: folderMusic,   pos: { top: '220px', left: '60px'  } },
  { id: 'connect', label: 'Connect',  icon: folderConnect, pos: { top: '220px', right: '60px' } },
  { id: 'resume',  label: 'Resume',   icon: folderResume,  pos: { top: '340px', right: '60px' } },
  { id: 'tools', label: 'Tools', icon:folderTools, pos: { top: '460px', right: '60px' }},
];

const PANDA_REACTIONS = {
  about: [
    "yep, that's me",
    "hi. that's me :)",
    "professional developer, full-time overthinker",
    "this is where i pretend i have my life together",
    "yes, i made this little world",
  ],

  music: [
    "ooh bangers only",
    "currently romanticizing my life",
    "coding playlist = activated",
  ],

  connect: [
    "go on, say hi",
    "don't be shy now",
    "come talk to me :)",
    "let's be internet friends",
  ],

  resume: [
    "my professional lore",
    "here's where i pretend i'm very professional",
    "the serious version of me",
    "yes, recruiters, this way",
  ],

  tools: [
    "nerd stuff in here",
    "my little digital toolbox",
    "things i use to make things",
    "developer things™",
  ],
};

const HomePage = () => {
  const [openWindow, setOpenWindow] = useState('about');
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const close = () => setOpenWindow(null);

  const renderWindow = () => {
    switch (openWindow) {
      case 'about':    return <AboutMe  onClose={close} />;
      case 'music':    return <Music    onClose={close} />;
      case 'connect':  return <Connect  onClose={close} />;
      case 'resume':   return <Resume   onClose={close} />;
      case 'tools':   return <Tools   onClose={close} />;
      default: return null;
    }
  };

  return (
    <div className="relative w-full h-screen">
      {folders.map(f => (
        <div
          key={f.id}
          className="absolute z-30"
          style={f.pos}
          onMouseEnter={() => setHoveredFolder(f.id)}
          onMouseLeave={() =>
            setHoveredFolder((current) => (current === f.id ? null : current))
          }
        >
          <FolderIcon
            label={f.label}
            icon={f.icon}
            onClick={() => setOpenWindow(f.id)}
          />
        </div>
      ))}

      {/* sticky-note */}
      <StickyNote initialX={200} initialY={145} onClose={() => setShowNote(false)} />

      {/* panda */}
      <div className="absolute bottom-3 left-2 z-[9999]">
        <Panda
          size={300}
          fps={12}
          reactTo={hoveredFolder}
          reactions={PANDA_REACTIONS}
        />
      </div>

      {openWindow && (
        <>
          <div className="fixed inset-0 z-20" onClick={close} />
          {renderWindow()}
        </>
      )}
    </div>
  );
};

export default HomePage;