import { User } from '../../interfaces/user';
import { CloseButton, UcademyButtonStyled } from '../../styles/ui/button';
import ImageSvg from '../icons/ImageSvg';
import UserSvg from '../icons/UserSvg';
import EmailSvg from '../icons/EmailSvg';
import PhoneSvg from '../icons/PhoneSvg';
import { Switch } from '../switch/Switch';
import { useState } from 'react';
import { UpdateUsersStatus } from '../../interfaces/fetches';
import ModalError from './ModalError';
import { LoadingStyled } from '../../styles/ui/loading';
import {
  ModalOverlay,
  ModalUserContainer,
  ModalUserDivContainer,
  ModalUserImage,
  ModalUserInfo,
  ModalUserInfoContainer,
  ModalUserInfoItem,
  ModalUserInfoTitle,
  ModalUserInfoValue,
  ModalUserLayout,
  ModalUserProfile,
} from '../../styles/modal/modal-styles';
import ModalUpdateStatus from './ModalUpdateStatus';

interface Props {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const ModalUser: React.FC<Props> = ({ user, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [isActive, setIsActive] = useState(user.isActive);
  const [modalActive, setModalActive] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSwitchChange = async (status: boolean) => {
    try {
      setIsLoading(true);

      if (isActive && !status) {
        setModalActive(true);
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/users/${user.id.$oid}/update-status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: status }),
        }
      );

      const data: UpdateUsersStatus = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setIsActive(status);
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
      <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
        <ModalUserContainer>
          {/* Header */}
          <ModalUserLayout>
            <ModalUserProfile>Perfil</ModalUserProfile>

            <UcademyButtonStyled className="poppins-semibold">
              Editar estudiante
            </UcademyButtonStyled>
          </ModalUserLayout>

          {/* Image */}
          <ModalUserDivContainer>
            <ModalUserImage>
              <ImageSvg width={44} height={44} />
            </ModalUserImage>
          </ModalUserDivContainer>

          {/* Info */}
          <ModalUserDivContainer>
            <ModalUserInfoContainer>
              {/* Nombre y apellidos */}
              <ModalUserInfoItem>
                <UserSvg width={25} height={25} />
                <ModalUserInfo>
                  <ModalUserInfoTitle className="poppins-light">
                    Nombre y apellidos
                  </ModalUserInfoTitle>
                  <ModalUserInfoValue className="poppins-regular">
                    {user.name} {user.lastName}
                  </ModalUserInfoValue>
                </ModalUserInfo>
              </ModalUserInfoItem>

              {/* Username */}
              <ModalUserInfoItem>
                <div style={{ width: 25, height: 25 }} />
                <ModalUserInfo>
                  <ModalUserInfoTitle className="poppins-light">
                    Nombre de usuario
                  </ModalUserInfoTitle>
                  <ModalUserInfoValue className="poppins-regular">
                    {user.username ?? '-'}
                  </ModalUserInfoValue>
                </ModalUserInfo>
              </ModalUserInfoItem>

              {/* Email */}
              <ModalUserInfoItem>
                <EmailSvg width={25} height={25} />
                <ModalUserInfo>
                  <ModalUserInfoTitle className="poppins-light">
                    Email
                  </ModalUserInfoTitle>
                  <ModalUserInfoValue className="poppins-regular">
                    {user.email}
                  </ModalUserInfoValue>
                </ModalUserInfo>
              </ModalUserInfoItem>

              {/* Teléfono */}
              <ModalUserInfoItem>
                <PhoneSvg width={25} height={25} />
                <ModalUserInfo>
                  <ModalUserInfoTitle className="poppins-light">
                    Móvil
                  </ModalUserInfoTitle>
                  <ModalUserInfoValue className="poppins-regular">
                    {user.phone}
                  </ModalUserInfoValue>
                </ModalUserInfo>
              </ModalUserInfoItem>
            </ModalUserInfoContainer>
          </ModalUserDivContainer>

          {/* Footer */}
          <ModalUserLayout>
            {isLoading ? (
              <LoadingStyled>Cargando...</LoadingStyled>
            ) : (
              <>
                <Switch
                  label={isActive ? 'Cuenta activa' : 'Cuenta inactiva'}
                  checked={isActive}
                  onChange={handleSwitchChange}
                />

                <CloseButton onClick={onClose}>Cerrar</CloseButton>
              </>
            )}
          </ModalUserLayout>
        </ModalUserContainer>
      </ModalOverlay>

      {error && (
        <ModalError
          isOpen={!!error}
          onClose={() => setError(undefined)}
          description={error}
        />
      )}

      {modalActive && (
        <ModalUpdateStatus
          isOpen={modalActive}
          onClose={() => setModalActive(false)}
          userId={user.id.$oid}
          setIsActive={setIsActive}
        />
      )}
    </>
  );
};

export default ModalUser;
