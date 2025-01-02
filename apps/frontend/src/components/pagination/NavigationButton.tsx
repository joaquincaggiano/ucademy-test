import React from 'react';
import { IconButton } from './pagination-styles';

interface NavigationButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  onClick,
  disabled,
  ariaLabel
}) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {icon}
  </IconButton>
);

export default NavigationButton;