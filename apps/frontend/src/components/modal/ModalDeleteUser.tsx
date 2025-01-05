import { useState } from 'react';
import {
  ModalButtonContainer,
  ModalContainer,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
} from '../../styles/modal/modal-styles';
import { Button } from '../../styles/ui/button';
import { FetchResponse } from '../../interfaces/fetches';
import ModalError from './ModalError';
import { useUsersStore } from '../../store/users';
import { useSearchParams } from 'react-router';

interface Props {
  isOpen: boolean;
  userId: string;
  onClose: () => void;
}

const ModalDeleteUser = ({ isOpen, userId, onClose }: Props) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const setRefreshUsers = useUsersStore((state) => state.setRefreshUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/delete`,
        {
          method: 'DELETE',
        }
      );
      const res: FetchResponse = await response.json();

      if (res.status !== 200) {
        throw new Error(res.message);
      }

      setRefreshUsers(page);
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalOverlay $isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader>
            <ModalDescription>
              ¿Seguro que quieres eliminar este usuario?
            </ModalDescription>
          </ModalHeader>
          <ModalButtonContainer>
            <Button
              $backgroundColor="#FFF"
              $color="#262D34"
              $border="1px solid #262D34"
              $hoverBackgroundColor="#F9FBFF"
              $hoverColor="#262D34"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button
              $backgroundColor="#e36058"
              $color="#fff"
              $border="1px solid #e36058"
              $hoverBackgroundColor="#ffffff"
              $hoverColor="#e36058"
              onClick={handleDeleteUser}
              disabled={isLoading}
            >
              {isLoading ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </ModalButtonContainer>
        </ModalContainer>
      </ModalOverlay>

      {error && (
        <ModalError
          isOpen={!!error}
          onClose={() => setError(undefined)}
          description={error}
        />
      )}
    </>
  );
};

export default ModalDeleteUser;
