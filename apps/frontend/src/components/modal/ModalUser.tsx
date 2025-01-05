import { Button } from '../../styles/ui/button';
import ImageSvg from '../icons/ImageSvg';
import UserSvg from '../icons/UserSvg';
import EmailSvg from '../icons/EmailSvg';
import PhoneSvg from '../icons/PhoneSvg';
import { Switch } from '../switch/Switch';
import { useState } from 'react';
import { FetchResponse } from '../../interfaces/fetches';
import ModalError from './ModalError';
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
import ModalWriteUser from './ModalWriteUser';
import { ContainerLoading, Loader } from '../../styles/ui/loading';
import { useUsersStore } from '../../store/users';
import { useSearchParams } from 'react-router';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalUser: React.FC<Props> = ({ isOpen, onClose }) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const user = useUsersStore((state) => state.user);
  const setUser = useUsersStore((state) => state.setUser);
  const setRefreshUsers = useUsersStore((state) => state.setRefreshUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [modalActive, setModalActive] = useState(false);
  const [openWriteUser, setOpenWriteUser] = useState(false);

  if (!isOpen) return null;
  if (!user) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSwitchChange = async (status: boolean) => {
    try {
      setIsLoading(true);

      if (user.isActive && !status) {
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

      const data: FetchResponse = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message);
      }

      setUser({ ...user, isActive: status });
      setRefreshUsers(page);
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

            <Button
              onClick={() => setOpenWriteUser(true)}
              disabled={isLoading}
              $hoverBoxShadow="0 0 10px 0 rgba(0, 0, 0, 0.1)"
            >
              Editar estudiante
            </Button>
          </ModalUserLayout>

          {/* Image */}
          <ModalUserDivContainer>
            <ModalUserImage>
              {user.image ? (
                <img src={user.image} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%' }} />
              ) : (
                <ImageSvg width={44} height={44} />
              )}
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
                    {user.phone ?? '-'}
                  </ModalUserInfoValue>
                </ModalUserInfo>
              </ModalUserInfoItem>
            </ModalUserInfoContainer>
          </ModalUserDivContainer>

          {/* Footer */}
          <ModalUserLayout>
            {isLoading ? (
              <ContainerLoading><Loader /></ContainerLoading>
            ) : (
              <>
                <Switch
                  label={user.isActive ? 'Cuenta activa' : 'Cuenta inactiva'}
                  checked={user.isActive}
                  onChange={handleSwitchChange}
                />

                <Button
                  $backgroundColor="#FFF"
                  $color="#262D34"
                  $border="1px solid #262D34"
                  $hoverBackgroundColor='#F9FBFF'
                  $hoverColor='#262D34'
                  disabled={isLoading}
                  onClick={onClose}
                >
                  Cerrar
                </Button>
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
        />
      )}

      {openWriteUser && (
        <ModalWriteUser
          isOpen={openWriteUser}
          onClose={() => setOpenWriteUser(false)}
        />
      )}
    </>
  );
};

export default ModalUser;
