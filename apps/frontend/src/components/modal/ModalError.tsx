import {
  ModalContainer,
  ModalDescription,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from '../../styles/modal/modal-styles';
import { Button } from '../../styles/ui/button';
import WarningSvg from '../icons/WarningSvg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
}

const ModalError: React.FC<ModalProps> = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <WarningSvg width={32} height={32} color="#262D34" />
          <ModalTitle>Error</ModalTitle>
        </ModalHeader>

        <ModalDescription>{description}</ModalDescription>

        <div style={{ alignSelf: 'flex-end' }}>
        <Button
          $backgroundColor="#e36058"
          $color="#fff"
          $border="1px solid #e36058"
          $hoverBackgroundColor="#ffffff"
          $hoverColor="#e36058"
          onClick={onClose}
        >
          Cerrar
        </Button>

        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalError;
