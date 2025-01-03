import PlusSvg from '../icons/PlusSvg';
import { useEffect, useState } from 'react';
import { User } from '../../interfaces/user';
import Table from '../table/Table';
import { HeaderStyled, TitleStyled } from './home-style';
import { TableCell, TableRow } from '../table/table-styles';
import { LoadingStyled } from '../../styles/ui/loading';
import ModalError from '../modal/ModalError';
import { UcademyButtonStyled } from '../../styles/ui/button';
import ModalUser from '../modal/ModalUser';
import { GetUsersData } from '../../interfaces/fetches';

const Home = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [data, setData] = useState<{
    users: User[];
    totalPages: number;
    totalUsers: number;
  }>({
    users: [],
    totalPages: 0,
    totalUsers: 0,
  });

  const [user, setUser] = useState<User>();
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/users?page=${page}`
        );
        const data: GetUsersData = await response.json();
        setData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ha ocurrido un error, vuelva a intentarlo');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleRowClick = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const data = await response.json();

      setUser(data.user);
      setIsModalUserOpen(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ha ocurrido un error, vuelva a intentarlo');
      }
    } finally {
      setIsLoading(false);
    }
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
        <UcademyButtonStyled className="poppins-semibold">
          <PlusSvg width={20} height={20} color="#fff" /> Nuevo alumno
        </UcademyButtonStyled>
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
              <TableCell className="poppins-regular">
                {user.username ?? '-'}
              </TableCell>
              <TableCell className="poppins-regular">{user.email}</TableCell>
              <TableCell className="poppins-regular">
                {user.phone ?? '-'}
              </TableCell>
            </TableRow>
          ))}
        </Table>
      )}

      {error && (
        <ModalError
          isOpen={!!error}
          onClose={() => setError(undefined)}
          description={error}
        />
      )}

      {user && (
        <ModalUser
          user={user}
          isOpen={isModalUserOpen}
          onClose={() => {
            setIsModalUserOpen(false);
            setUser(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Home;
