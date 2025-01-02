import Pagination from '../pagination/Pagination';
import { StyledTable, TableContainer, TableHeader } from './table-styles';

interface Props {
  columns: string[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  children: React.ReactNode;
}

const Table = ({ columns, children, page, totalPages, onPageChange }: Props) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '17px' }}>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeader className="poppins-semibold">{column}</TableHeader>
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
      />
    </div>
  );
};

export default Table;
