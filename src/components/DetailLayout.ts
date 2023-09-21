import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
  }
`;

export const DetailImage = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: cover;
`;

export const DeleteButton = styled.button`
  width: 100%;
  height: 10%;
  border: none;
  border-radius: 10px;
  background-color: #09eb0c;
  cursor: pointer;
  &:hover {
    background-color: #ccfac6;
  }
`;

export const ContentContainer = styled.div`
  padding: 10px;
`;

export const PositionContainer = styled.div`
  display: flex;
  gap: 10px;
`;
