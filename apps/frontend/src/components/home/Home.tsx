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

const Home = () => {
  const [page, setPage] = useState(1);

  const [data, setData] = useState<{ users: User[]; totalPages: number }>({
    users: [],
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?page=${page}`
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [page]);

  // const handleNextPage = () => {
  //   if (page === data.totalPages) return;

  //   searchParams.set('page', String(page + 1));
  //   setSearchParams(searchParams);
  // };

  // const handlePrevPage = () => {
  //   if (page === 1) return;

  //   const newPage = Math.max(page - 1, 1);
  //   searchParams.set('page', String(newPage));
  //   setSearchParams(searchParams);
  // };

  const handleRowClick = (id: string) => {
    console.log(id);
  };

  console.log(data);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '100vh',
      }}
    >
      <HeaderStyled>
        <TitleStyled className="poppins-regular">Alumnos</TitleStyled>
        <NewStudentButtonStyled className="poppins-semibold ">
          <PlusSvg width={20} height={20} color="#fff" /> Nuevo alumno
        </NewStudentButtonStyled>
      </HeaderStyled>

      <Table
        columns={['', 'Nombre y apellidos', 'Usuario', 'Email', 'Móvil']}
        totalPages={data.totalPages}
        page={page}
        onPageChange={setPage}
      >
        {data.users.map((user) => (
          <TableRow
            key={user.id.$oid}
            onClick={() => handleRowClick(user.id.$oid)}
          >
            <TableCell className="poppins-regular">
              {user.isActive ? 'Activo' : 'Inactivo'}
            </TableCell>
            <TableCell className="poppins-regular">
              {user.name + ' ' + user.lastName}
            </TableCell>
            <TableCell className="poppins-regular">username</TableCell>
            <TableCell className="poppins-regular">{user.email}</TableCell>
            <TableCell className="poppins-regular">{user.phone}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default Home;
