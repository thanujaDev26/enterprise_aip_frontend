import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useAuthStore from '../../store/useAuthStore';

export default function UserMenu({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useAuthStore((s) => s.user) || { fullName: '' };

  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar>{(user.fullName || 'U').charAt(0)}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem disabled>{user.fullName || 'Signed in'}</MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); /* navigate to profile */ }}>Profile</MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); onLogout?.(); }}>Logout</MenuItem>
      </Menu>
    </>
  );
}
