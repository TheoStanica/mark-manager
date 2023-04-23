import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import PencilIcon from '@mui/icons-material/Edit';
import PostNowDialog from '../PostNowDialog';
import { useState } from 'react';

const drawerItemsData = [
  { id: 0, name: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
  { id: 1, name: 'Planner', route: '/planner', icon: <EventIcon /> },
];

const DrawerItems = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(true);
        }}
      >
        <ListItemIcon>
          <PencilIcon />
        </ListItemIcon>
        <ListItemText primary={'Post now'} />
      </ListItem>
      {drawerItemsData.map((item) => (
        <li key={item.id}>
          <ListItem button onClick={() => navigate(item.route)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </li>
      ))}
      <PostNowDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DrawerItems;
