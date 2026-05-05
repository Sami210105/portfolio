import React, { useState } from 'react';
import FolderIcon from '../folders/FolderIcon';

import Euphoria from '../folders/projects/Euphoria';
import Nec from '../folders/projects/Nec';
import SketchCharades from '../folders/projects/SketchCharades';
import Gameshub from '../folders/projects/Gameshub';
import Moodify from '../folders/projects/Moodify';
import Bugganizer from '../folders/projects/Bugganizer';

import folder from '../../assets/folder-about.png';

const projects = [
  { id: 'euphoria',    label: 'Euphoria',    icon: folder },
  { id: 'nec',         label: 'Ecell Website',         icon: folder },
  { id: 'sketch-charades', label: 'Sketch Charades', icon: folder },
  { id: 'gameshub',    label: 'Games Hub',    icon: folder },
  { id: 'moodify',     label: 'Moodify',     icon: folder },
  { id: 'bugganizer',  label: 'Bugganizer',  icon: folder },
];

const ProjectsPage = () => {
  const [openWindow, setOpenWindow] = useState('euphoria');
  const close = () => setOpenWindow(null);

  const renderWindow = () => {
    switch (openWindow) {
      case 'euphoria':    return <Euphoria  onClose={close} />;
      case 'nec':         return <Nec      onClose={close} />;
      case 'sketch-charades': return <SketchCharades onClose={close} />;
      case 'gameshub':    return <Gameshub onClose={close} />;
      case 'moodify':     return <Moodify  onClose={close} />;
      case 'bugganizer':  return <Bugganizer onClose={close} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-wrap gap-6 p-8">
      {projects.map(p => (
        <FolderIcon
          key={p.id}
          label={p.label}
          icon={p.icon}
          onClick={() => setOpenWindow(p.id)}
        />
      ))}

      {openWindow && (
        <>
          <div
            className="fixed inset-0"
            onClick={close}
          />
          {renderWindow()}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;