import { useEffect, useState } from 'react';
import PlusSvg from '../icons/PlusSvg';
import Table from '../table/Table';
import { TableCell, TableRow } from '../../styles/table/table-styles';
import ModalError from '../modal/ModalError';
import { Button } from '../../styles/ui/button';
import ModalUser from '../modal/ModalUser';
import { GetUserById, GetUsersData } from '../../interfaces/fetches';
import ModalWriteUser from '../modal/ModalWriteUser';
import {
  HeaderStyled,
  HomeContainerStyled,
  TitleStyled,
} from '../../styles/home/home-style';
import { ContainerLoading, Loader } from '../../styles/ui/loading';
import { useSearchParams } from 'react-router';
import { useUsersStore } from '../../store/users';
import TrashSvg from '../icons/TrashSvg';
import ModalDeleteUser from '../modal/ModalDeleteUser';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const users = useUsersStore((state) => state.users);
  const user = useUsersStore((state) => state.user);
  const setUsers = useUsersStore((state) => state.setUsers);
  const setUser = useUsersStore((state) => state.setUser);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [paginationData, setPaginationData] = useState<{
    totalPages: number;
    totalUsers: number;
  }>({
    totalPages: 0,
    totalUsers: 0,
  });

  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [openWriteUser, setOpenWriteUser] = useState<boolean>(false);

  const [hoverColor, setHoverColor] = useState<string>();
  const [openDeleteUser, setOpenDeleteUser] = useState<{
    isOpen: boolean;
    userId: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/users?page=${page}`
        );
        const data: GetUsersData = await response.json();

        setUsers(data.users);
        setPaginationData({
          totalPages: data.totalPages,
          totalUsers: data.totalUsers,
        });
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
  }, [page, setUsers, setPaginationData]);

  const handleRowClick = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      const data: GetUserById = await response.json();

      if (data.status !== 200 || !data.user) {
        throw new Error('Usuario no encontrado');
      }

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
    <HomeContainerStyled>
      <HeaderStyled>
        <TitleStyled className="poppins-regular">Alumnos</TitleStyled>
        <Button
          $padding="10px 18px"
          $hoverPadding="10px 18px"
          onClick={() => setOpenWriteUser(true)}
        >
          <PlusSvg width={20} height={20} color="#fff" /> Nuevo alumno
        </Button>
      </HeaderStyled>
      {isLoading ? (
        <ContainerLoading $isGrow>
          <Loader $width="40px" $height="40px" $borderWidth="4px" />
        </ContainerLoading>
      ) : (
        <Table
          columns={[
            '',
            'Nombre y apellidos',
            'Usuario',
            'Email',
            'Móvil',
            'Acciones',
          ]}
          totalPages={paginationData.totalPages}
          page={page}
          totalElements={paginationData.totalUsers}
          onPageChange={(newPage) => {
            setSearchParams({ page: newPage.toString() });
          }}
        >
          {users.map((user) => (
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
              <TableCell className="poppins-regular">
                <Button
                  $border="1px solid #F31260"
                  $backgroundColor="#F31260"
                  $padding="5px"
                  $hoverPadding="5px"
                  $hoverBackgroundColor="#FFFFFF"
                  onMouseEnter={() => setHoverColor(user.id.$oid)}
                  onMouseLeave={() => setHoverColor(undefined)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDeleteUser({ isOpen: true, userId: user.id.$oid });
                  }}
                >
                  <TrashSvg color={hoverColor === user.id.$oid ? '#F31260' : '#FFFFFF'} />
                </Button>
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
          isOpen={isModalUserOpen}
          onClose={() => {
            setIsModalUserOpen(false);
            setUser(null);
          }}
        />
      )}

      {openWriteUser && (
        <ModalWriteUser
          isOpen={openWriteUser}
          onClose={() => setOpenWriteUser(false)}
        />
      )}

      {openDeleteUser && (
        <ModalDeleteUser
          isOpen={openDeleteUser.isOpen}
          onClose={() => setOpenDeleteUser(undefined)}
          userId={openDeleteUser.userId}
        />
      )}
    </HomeContainerStyled>
  );
};

export default Home;
