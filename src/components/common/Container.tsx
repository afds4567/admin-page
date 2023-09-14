import styled from 'styled-components';

export interface ContainerProps {
  display?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  padding?: string;
  backgroundColor?: string;
  backdropFilter?: string;
  overflow?: string;
}

const Container = styled.div<ContainerProps>`
  display: ${({ display }) => display || 'block'};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  min-width: ${({ minWidth }) => minWidth || '0'};
  min-height: ${({ minHeight }) => minHeight || '0'};
  padding: ${({ padding }) => padding};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  backdrop-filter: ${({ backdropFilter }) => backdropFilter};
  overflow: ${({ overflow }) => overflow};
`;

export default Container;
