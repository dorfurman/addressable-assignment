import styled from "styled-components";
import { useState } from "react";

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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #1e2329;
  padding: 0 4px;
  padding-right: 32px; /* Make room for submit button */
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s ease;
  min-width: 120px;
  height: 30px;
  width: 100%;

  /* Remove number input spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 4px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: #9ca3af;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f3f4f6;
    color: #3b82f6;
  }

  &:active {
    background-color: #e5e7eb;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

interface Props {
  label: string;
  placeholder: string;
  value: number | undefined;
  onSubmit: (value: number | undefined) => void;
}

export default function NumberInputField(props: Props) {
  const [localValue, setLocalValue] = useState(
    props.value ? formatNumberWithCommas(props.value.toString()) : ""
  );

  const handleSubmit = () => {
    const rawValue = parseFormattedNumber(localValue);
    props.onSubmit(rawValue ? Number(rawValue) : undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatNumberWithCommas(inputValue);
    setLocalValue(formattedValue);
  };

  return (
    <FormGroup>
      <Label>{props.label}</Label>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder={props.placeholder}
          value={localValue}
          onChange={handleChange}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
        <SubmitButton type="button" onClick={handleSubmit} title="Apply filter">
          <SubmitIcon />
        </SubmitButton>
      </InputContainer>
    </FormGroup>
  );
}

// Submit icon component
const SubmitIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 10l-5 5 5 5" />
    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
  </svg>
);

// Utility function to format number with commas
const formatNumberWithCommas = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, "");

  if (!cleanValue) return "";

  const parts = cleanValue.split(".");

  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (parts.length > 1) {
    return `${integerPart}.${parts[1]}`;
  }

  return integerPart;
};

// Utility function to parse formatted number back to raw number
const parseFormattedNumber = (value: string): string => {
  return value.replace(/,/g, "");
};
