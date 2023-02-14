import styled from 'styled-components';

type BackgroundImageProps = {
  imageUrl: string;
}

export const BackgroundImage = styled.div<BackgroundImageProps>`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};

  transition: transform 1s cubic-bezier(0.25, 0.45, 0.45, 0.95);
`

export const Body = styled.div`
  height: 90px;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: white;
  opacity: 0.7;
  position: absolute;

  h2 {
    font-weight: bold;
    margin: 0 0.375rem 0;
    font-size: 1.375rem;
    color: #4a4a4a;
    text-transform: uppercase;
  }

  p {
    font-weight: lighter;
    font-size: 1rem;
    margin: 1rem 0 0;
  }
`

export const DirectoryItemContainer = styled.div`
  min-width: 30%;
  height: 45%;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 0.5rem 1rem;
  overflow: hidden;

  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 4s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Body} {
      opacity: 0.9;
    }
  }

  &:first-child {
    margin-right: 0.5rem;
  }

  &:last-child {
    margin-left: 0.5rem;
  }
`