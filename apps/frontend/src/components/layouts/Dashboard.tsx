import NotificationSvg from '../icons/NotificationSvg';
import HelpSvg from '../icons/HelpSvg';
import GraduateSvg from '../icons/GraduateSvg';
import { NavLink } from 'react-router';
import { Outlet } from 'react-router';
import {
  DashboardStyled,
  MainStyled,
  SidebarHeaderStyled,
  SidebarItemStyled,
  SidebarStyled,
} from './dashboard-style';
import UcademySvg from '../icons/UcademySvg';

const Dashboard = () => {
  return (
    <DashboardStyled>
      <SidebarStyled>
        <SidebarHeaderStyled>
          <UcademySvg />
          <NotificationSvg width={18} height={20} />
          <HelpSvg width={20} height={20} />
        </SidebarHeaderStyled>

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
            <GraduateSvg width={20} height={20} />
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
