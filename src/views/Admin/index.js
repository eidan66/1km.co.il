import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Button } from '../../components';
import { AdminWrapper, AdminNavigation, AdminNavButton } from './components';
import LeaderAdmin from './LeaderAdmin';
import ProtestAdmin from './ProtestAdmin';
import EditsAdmin from "./EditsAdmin";
import { handleSignIn } from '../../api';
import { isAdmin } from '../../utils';

const Admin = ({ user }) => {
  const location = useLocation();

  return (
    <AdminWrapper>
      {user === undefined ? (
        <div>טוען...</div>
      ) : user ? (
        <>
          <Switch>
            {!isAdmin(user) && <Redirect to="/" />}
            <Route exact path="/admin">
              <Redirect to="/admin/protest-requests" />
            </Route>
            <Route path="/admin/protest-requests">
              <ProtestAdmin />
            </Route>
            <Route path="/admin/leader-requests/:leaderId?">
              <LeaderAdmin user={user} />
            </Route>
            <Route path="/admin/edits">
              <EditsAdmin />
            </Route>
      
          </Switch>
          {['/admin/protest-requests/', '/admin/protest-requests'].includes(location.pathname) ? (
            <AdminNavigation to="/admin/leader-requests" style={{ height: 'min-content' }}>
              <AdminNavButton>אישור מובילים</AdminNavButton>
            </AdminNavigation>
          ) : (
            <AdminNavigation to="/admin/protest-requests">
              <AdminNavButton>אישור הפגנות</AdminNavButton>
            </AdminNavigation>
          )}
        </>
      ) : (
        <Button onClick={handleSignIn}>התחבר למערכת</Button>
      )}
    </AdminWrapper>
  );
};

export default Admin;
