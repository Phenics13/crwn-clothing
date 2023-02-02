import styled from 'styled-components';

export const WishlistItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-items: center;
  column-gap: 5px;
  padding: 15px 0;
  border-bottom: solid 1px black;
  font-size: 20px;

  img {
    width: 100%
  }
`;

export const BaseSpan = styled.span`

`;

export const NameSpan = styled(BaseSpan)`
  margin: 0 auto 0 10px;
`;

export const SpanButton = styled.span`
  cursor: pointer;
`;

export const PlusButton = styled(SpanButton)`

`;

export const RemoveButton = styled(SpanButton)`

`;