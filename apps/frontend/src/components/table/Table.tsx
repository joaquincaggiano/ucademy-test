import Pagination from '../pagination/Pagination';
import { StyledTable, TableContainer, TableHeader } from './table-styles';

interface Props {
  columns: string[];
  page: number;
  totalPages: number;
  totalElements?: number;
  children: React.ReactNode;
  onPageChange: (page: number) => void;
}

const Table = ({
  columns,
  children,
  page,
  totalPages,
  totalElements,
  onPageChange,
}: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '17px' }}>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeader key={column} className="poppins-semibold">{column}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </StyledTable>
      </TableContainer>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalElements={totalElements}
      />
    </div>
  );
};

export default Table;
