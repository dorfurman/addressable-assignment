import styled from "styled-components";
import type { FormattedCryptoData } from "../types/types";

const GridCellNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const LabelView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Label = styled.h3`
  font-weight: 500;
  font-size: 14px;
  color: #1e2329;
  line-height: 1.2;
`;

const Symbol = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #76808f;
  line-height: 1.2;
`;

interface Props {
  data: FormattedCryptoData;
}

export default function GridCellName({ data }: Props) {
  const { logo, name, symbol } = data;
  return (
    <GridCellNameContainer>
      <Image src={logo || ""} alt={name} />
      <LabelView>
        <Label>{name}</Label>
        <Symbol>${symbol}</Symbol>
      </LabelView>
    </GridCellNameContainer>
  );
}
