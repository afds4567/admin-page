import styled from 'styled-components';

import { Member } from '../types/member';
import { counts } from '../utils/countMember';

interface ChartProps {
  data: Member[];
  startDaysAgo: number;
}

export const Chart = ({ data, startDaysAgo }: ChartProps) => {
  const dataCounts = counts(data, startDaysAgo);

  const maxCount = Math.max(...Object.values(dataCounts));

  return (
    <ChartContainer>
      {Object.entries(dataCounts).map(([date, count]) => {
        const barLengthNormalized = Math.floor((count / maxCount) * 100);

        return (
          <BarWrapper key={date}>
            <BarDate>{date}:</BarDate>
            <Bar length={barLengthNormalized} />
            <BarCount>{count}</BarCount>
          </BarWrapper>
        );
      })}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
`;

const BarDate = styled.span`
  min-width: 100px;
`;

const BarCount = styled.span`
  margin-left: 5px;
`;

const Bar = styled.span<{ length: number }>`
  background-color: #000;
  height: 20px;
  width: ${(props) => `${props.length}px`};
  display: inline-block;
`;
