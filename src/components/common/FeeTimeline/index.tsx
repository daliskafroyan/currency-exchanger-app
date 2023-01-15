import { ThemeIcon, Text, Avatar, Timeline, createStyles, Loader } from '@mantine/core';
import { IconArrowsRightLeft, IconMathXMinusX, IconMinus, IconSun, IconVideo } from '@tabler/icons';
import styled from '@emotion/styled';

const FirstVerticalLine = styled.div`
    position: relative;

  &::before {
    box-sizing: border-box;
    position: absolute;
    left: -4px;
    right: auto;
    bottom: -24px;
    border-left: 4px solid #dee2e6;
    content: "";
    height: 62px;
  }
`;

const LastVerticalLine = styled.div`
    position: relative;

  &::before {
    box-sizing: border-box;
    position: absolute;
    left: -4px;
    top: 0;
    right: auto;
    bottom: -24px;
    border-left: 4px solid #dee2e6;
    height: 138px;
    content: "";
  }
`;

export default function FeeTimeline({ fee, exchangeRate, loading, currency }: { fee: number, exchangeRate: number, loading: boolean, currency: string }) {
  return (
    <div
      style={{
        maxWidth: 450,
        margin: 'auto',
        background: '#EDF6FF',
        padding: '14px',
        paddingBottom: '28px'
      }}
    >
      <Timeline>
        <FirstVerticalLine />
        <LastVerticalLine />

        <Timeline.Item title="Fees" bulletSize={24} bullet={<IconMinus size={14} />}>
          {
            loading ?
              <Loader variant="dots" /> :
              <Text color="dimmed" size="sm">
                {fee}
              </Text>
          }
        </Timeline.Item>
        <Timeline.Item title="Exchange Rate" bulletSize={24} bullet={<IconArrowsRightLeft size={14} />}>
          {
            loading ?
              <Loader variant="dots" /> :
              <Text color="dimmed" size="sm">
                {exchangeRate} {currency}
              </Text>
          }
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
