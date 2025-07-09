import styled from "styled-components";

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: #58667e;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: block;
`;

const StyledSelect = styled.select`
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #1e2329;
  padding: 0 4px;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease;
  min-width: 140px;
  height: 30px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }

  option {
    background-color: #ffffff;
    color: #1e2329;
    padding: 8px;
  }
`;

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function SelectField(props: Props) {
  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <StyledSelect
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </FormGroup>
  );
}
