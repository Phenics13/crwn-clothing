import styled from 'styled-components';

export const WishlistTitle = styled.h2`
  text-align: center;
`;

export const WishlistHeader = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 5px;
  padding-bottom: 15px;
  justify-items: center;

  border-bottom: solid 1px black;
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
`;

export const WishlistContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;