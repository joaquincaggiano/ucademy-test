import { useState } from 'react';
import {
  ModalContainer,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalButtonContainer,
} from '../../styles/modal/modal-styles';
import { Button } from '../../styles/ui/button';
import WarningSvg from '../icons/WarningSvg';
import { FetchUserResponse } from '../../interfaces/fetches';
import ModalError from './ModalError';
import { useUsersStore } from '../../store/users';
import { useSearchParams } from 'react-router';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const ModalUpdateStatus = ({ isOpen, onClose, userId }: Props) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const user = useUsersStore((state) => state.user);
  const setUser = useUsersStore((state) => state.setUser);
  const setRefreshUsers = useUsersStore((state) => state.setRefreshUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  if (!user) return null;

  const handleStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/update-status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: false }),
        }
      );

      const data: FetchUserResponse = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setUser({ ...user, isActive: false });
      setRefreshUsers(page);

      onClose();
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
    <>
      <ModalOverlay $isOpen={isOpen}>
        <ModalContainer>
          <ModalHeader>
            <WarningSvg width={32} height={32} color="#262D34" />
            <ModalDescription>
              ¿Seguro que quieres desactivar esta cuenta? <br /> El usuario
              dejará de tener acceso a la plataforma.
            </ModalDescription>
          </ModalHeader>

          <ModalButtonContainer>
            <Button
              $backgroundColor="#FFF"
              $color="#262D34"
              $border="1px solid #262D34"
              $hoverBackgroundColor="#F9FBFF"
              $hoverColor="#262D34"
              $padding="10px 18px"
              $hoverPadding="10px 18px"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>

            <Button
              $backgroundColor="#e36058"
              $color="#fff"
              $padding="10px 18px"
              $border="1px solid #e36058"
              $hoverBackgroundColor="#ffffff"
              $hoverColor="#e36058"
              $hoverPadding="10px 18px"
              onClick={handleStatus}
              disabled={isLoading}
            >
              {isLoading ? 'Desactivando...' : 'Desactivar'}
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

export default ModalUpdateStatus;
