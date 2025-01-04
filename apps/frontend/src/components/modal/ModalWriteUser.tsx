import { User } from '../../interfaces/user';
import {
  ModalOverlay,
  ModalUserContainer,
  ModalUserLayout,
  ModalUserProfile,
} from '../../styles/modal/modal-styles';
import { Button } from '../../styles/ui/button';
import { FormContainer, FormItem } from '../../styles/ui/form';
import { Input } from '../../styles/ui/input';
import { Label } from '../../styles/ui/label';

interface Props {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
}

const ModalWriteUser = ({ isOpen, user, onClose }: Props) => {
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalUserContainer>
        {/* Header */}
        <ModalUserLayout>
          <ModalUserProfile>Perfil</ModalUserProfile>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                $backgroundColor="#FFF"
                $color="#262D34"
                $border="1px solid #262D34"
                $padding="7px 9px"
                $hoverBackgroundColor="#F9FBFF"
                $hoverColor="#262D34"
                $hoverPadding="6.5px 8.5px"
                onClick={onClose}
              >
                Cancelar edición
              </Button>
              <Button>Guardar</Button>
            </div>
          ) : (
            <Button>Crear estudiante</Button>
          )}
        </ModalUserLayout>

        {/* Body */}
        <FormContainer>
          {/* Nombre */}
          <FormItem>
            <Label>Nombre</Label>
            <Input type="text" />
          </FormItem>

          {/* Apellidos */}
          <FormItem>
            <Label>Apellidos</Label>
            <Input type="text" />
          </FormItem>

          {/* Nombre de usuario */}
          <FormItem>
            <Label>Nombre de usuario</Label>
            <Input type="text" />
          </FormItem>

          {/* Email */}
          <FormItem>
            <Label>Email</Label>
            <Input type="email" />
          </FormItem>

          {/* Móvil */}
          <FormItem>
            <Label>Móvil</Label>
            <Input type="tel" />
          </FormItem>
        </FormContainer>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            $backgroundColor="#FFF"
            $color="#262D34"
            $border="1px solid #262D34"
            $hoverBackgroundColor="#F9FBFF"
            $hoverColor="#262D34"
            $hoverPadding="7.5px 9.5px"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </ModalUserContainer>
    </ModalOverlay>
  );
};

export default ModalWriteUser;
