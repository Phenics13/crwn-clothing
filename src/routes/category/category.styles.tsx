import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1.25rem;
  row-gap: 1.5rem;
`;

export const CategoryTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  margin-bottom: 25px;
`;