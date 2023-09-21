import styled from 'styled-components';

interface ImageProps {
  imgHeight?: string;
}

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  border: 1px solid #ccc;
  border-radius: 10px;

  background-color: #f5f5f5;

  width: auto;
  height: 100%;
  padding: 1rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    color: #333333;
    //margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #333333;
  }
`;

export const DetailImage = styled.img<ImageProps>`
  margin-top: 20px;

  height: ${(props) => props.imgHeight || '50vh'};
  border-radius: 10%;

  object-fit: fill;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Tag = styled.div`
  display: inline-block;
  background-color: darkorange;
  color: #ffffff;
  width: fit-content;
  padding: 5px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const TagContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
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

export const PositionContainer = styled.div`
  display: flex;
  gap: 10px;
`;
