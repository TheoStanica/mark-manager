import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';

const drawerItemsData = [
  { id: 0, name: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
  { id: 1, name: 'Planner', route: '/planner', icon: <EventIcon /> },
];

const DrawerItems = () => {
  const navigate = useNavigate();

  return (
    <>
      {drawerItemsData.map((item) => (
        <li key={item.id}>
          <ListItem button onClick={() => navigate(item.route)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        </li>
      ))}
    </>
  );
};

export default DrawerItems;
