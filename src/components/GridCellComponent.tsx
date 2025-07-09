import styled from "styled-components";

interface StyledCellProps {
  variant: Props["variant"];
  isPositive?: boolean;
  isNegative?: boolean;
}

const StyledCell = styled.div<StyledCellProps>`
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-size: 14px;

  ${({ variant }) => {
    switch (variant) {
      case "rank":
        return `
          font-weight: 500;
          color: #58667e;
        `;
      case "name":
        return `
          padding-left: 16px;
          padding-right: 16px;
        `;
      case "price":
        return `
          font-weight: 600;
          color: #1e2329;
        `;
      case "change":
        return `
          font-weight: 600;
        `;
      case "standard":
      default:
        return `
          font-weight: 500;
          color: #1e2329;
        `;
    }
  }}

  ${({ variant, isPositive, isNegative }) => {
    if (variant === "change") {
      if (isPositive) return "color: #00d4aa;";
      if (isNegative) return "color: #f84960;";
      return "color: #58667e;";
    }
  }}
`;

interface Props {
  value?: number | string | null;
  variant?: "rank" | "name" | "price" | "change" | "standard";
  formatType?:
    | "number"
    | "currency"
    | "currencyCompact"
    | "numberCompact"
    | "percentage";
  className?: string;
}

export default function GridCellComponent(props: Props) {
  const {
    value,
    variant = "standard",
    formatType = "number",
    className,
  } = props;

  const numValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? parseFloat(value)
      : null;
  const isPositive = numValue !== null && numValue > 0;
  const isNegative = numValue !== null && numValue < 0;

  return (
    <StyledCell
      variant={variant}
      isPositive={isPositive}
      isNegative={isNegative}
      className={className}
    >
      {formatValue(value ?? null, formatType)}
    </StyledCell>
  );
}

const formatValue = (
  value: number | string | null,
  type: Props["formatType"]
): string => {
  if (!value && value !== 0) return "--";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "--";

  switch (type) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: numValue > 1 ? 2 : 8,
      }).format(numValue);

    case "currencyCompact":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(numValue);

    case "numberCompact":
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
      }).format(numValue);

    case "percentage":
      return `${numValue > 0 ? "+" : ""}${numValue.toFixed(2)}%`;

    case "number":
    default:
      return new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 0,
      }).format(numValue);
  }
};
