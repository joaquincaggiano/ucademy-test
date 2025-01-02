import UcademyLogo from '../../assets/logos/ucademy-logo.png';
import NotificationSvg from '../icons/NotificationSvg';
import HelpSvg from '../icons/HelpSvg';
import GraduateSvg from '../icons/GraduateSvg';
import { NavLink } from 'react-router';
import { Outlet } from 'react-router';
import { DashboardStyled, MainStyled, SidebarItemStyled, SidebarStyled } from './dashboard-style';

const Dashboard = () => {
  return (
    <DashboardStyled>
      <SidebarStyled>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <img src={UcademyLogo} alt="ucademy-logo" />
          <NotificationSvg />
          <HelpSvg />
        </div>

        <NavLink
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            textDecoration: 'none',
          }}
        >
          <div>
            <GraduateSvg />
          </div>
          <SidebarItemStyled className="poppins-regular">
            Alumnos
          </SidebarItemStyled>
        </NavLink>
      </SidebarStyled>

      <MainStyled>
        <Outlet />
      </MainStyled>
    </DashboardStyled>
  );
};

export default Dashboard;
