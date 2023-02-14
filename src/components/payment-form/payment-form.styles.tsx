import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  min-width: 500px;

  & > *:nth-child(3) {
    margin-top: 30px;
  }
`

export const PaymentButton = styled(Button)`
  margin: 30px 0 30px auto;
`


