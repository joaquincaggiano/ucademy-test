import { SwitchContainer, SwitchInput, SwitchLabel, SwitchSlider } from "../../styles/ui/switch";

interface SwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <SwitchContainer>
      <SwitchInput
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <SwitchSlider $checked={checked} />
      <SwitchLabel className="poppins-regular">{label}</SwitchLabel>
    </SwitchContainer>
  );
};
