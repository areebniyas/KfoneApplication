import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Message = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #f44336;
`;

const AdminOnlyPage = () => {
  return (
    <Wrapper>
      <Message>You need admin privileges to view this page</Message>
    </Wrapper>
  );
};

export default AdminOnlyPage;
