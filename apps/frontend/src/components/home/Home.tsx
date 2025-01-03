import PlusSvg from '../icons/PlusSvg';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/user';
import Table from '../table/Table';
import {
  HeaderStyled,
  NewStudentButtonStyled,
  TitleStyled,
} from './home-style';
import { TableCell, TableRow } from '../table/table-styles';
import { LoadingStyled } from '../../styles/loading';

const Home = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<{
    users: User[];
    totalPages: number;
    totalUsers: number;
  }>({
    users: [],
    totalPages: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/users?page=${page}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleRowClick = (id: string) => {
    console.log(id);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <HeaderStyled>
        <TitleStyled className="poppins-regular">Alumnos</TitleStyled>
        <NewStudentButtonStyled className="poppins-semibold ">
          <PlusSvg width={20} height={20} color="#fff" /> Nuevo alumno
        </NewStudentButtonStyled>
      </HeaderStyled>
      {isLoading ? (
        <LoadingStyled>Cargando...</LoadingStyled>
      ) : (
        <Table
          columns={['', 'Nombre y apellidos', 'Usuario', 'Email', 'Móvil']}
          totalPages={data.totalPages}
          page={page}
          totalElements={data.totalUsers}
          onPageChange={setPage}
        >
          {data.users.map((user) => (
            <TableRow
              key={user.id.$oid}
              onClick={() => handleRowClick(user.id.$oid)}
            >
              <TableCell className="poppins-regular">
                {user.isActive ? (
                  <div
                    style={{
                      borderRadius: '5px',
                      backgroundColor: '#90E8BE',
                      padding: '3px 7px',
                      width: 'fit-content',
                      fontSize: '12px',
                      color: '#262D34',
                    }}
                  >
                    Activo
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: '5px',
                      backgroundColor: '#CAD6DC',
                      padding: '3px 7px',
                      width: 'fit-content',
                      fontSize: '12px',
                      color: '#262D34',
                    }}
                  >
                    Inactivo
                  </div>
                )}
              </TableCell>
              <TableCell className="poppins-regular">
                {user.name + ' ' + user.lastName}
              </TableCell>
              <TableCell className="poppins-regular">{user.username ?? "-"}</TableCell>
              <TableCell className="poppins-regular">{user.email}</TableCell>
              <TableCell className="poppins-regular">{user.phone ?? "-"}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </div>
  );
};

export default Home;
