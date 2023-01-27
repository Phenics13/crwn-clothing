import styled from 'styled-components';

export const ButtonContainer = styled.div`
  width: 80%;
  opacity: 0.85;
  position: absolute;
  top: 255px;
  display: none;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    padding: 0 15px;
  }

  button:nth-child(2) {
    width: auto;
    min-width: 50px;
    padding: 0;
    border-left: none;
  }
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    ${ButtonContainer} {
      display: flex;
    }
  }
`;

export const Footer = styled.div`
  font-size: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;