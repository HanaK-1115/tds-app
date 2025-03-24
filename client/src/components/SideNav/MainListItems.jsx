
import DashboardIcon from '@mui/icons-material/Dashboard';
export const MainListItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const handlePaidLeaveClick = () => {
      navigate('/applications-Overview');
    };
  
    return (
      <React.Fragment>
        <ListItemButton
          onClick={handlePaidLeaveClick}
          sx={location.pathname === '/applications-Overview' ? activeListItemStyle : listItemStyle}
        >
          <ListItemIcon sx={{ color: location.pathname === '/applications-Overview' ? '#ffffff' : '#94a3b8' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="申請一覧" />
        </ListItemButton>
      </React.Fragment>
    );
  };