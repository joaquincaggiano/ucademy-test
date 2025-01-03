import { useState } from 'react';
import {
  ModalContainer,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalUpdateStatusButtonContainer,
} from '../../styles/modal/modal-styles';
import { ButtonRed, CloseButton } from '../../styles/ui/button';
import WarningSvg from '../icons/WarningSvg';
import { UpdateUsersStatus } from '../../interfaces/fetches';
import ModalError from './ModalError';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  setIsActive: (value: boolean) => void;
}

const ModalUpdateStatus = ({ isOpen, onClose, userId, setIsActive }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

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

      const data: UpdateUsersStatus = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      onClose();
      setIsActive(false);
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

          <ModalUpdateStatusButtonContainer>
            <CloseButton onClick={onClose} disabled={isLoading}>
              Cancelar
            </CloseButton>

            <ButtonRed onClick={handleStatus} disabled={isLoading}>
              {isLoading ? 'Desactivando...' : 'Desactivar'}
            </ButtonRed>
          </ModalUpdateStatusButtonContainer>
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
