import React from 'react'
import styled from "@emotion/styled"
import base from '../../styles/emotions/base';

const Section = styled.section`
  margin-bottom: 1rem;
  background-color: ${base.dark};
  padding: 1rem;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const Title = styled.h1`
    font-weight: 300;
    color: ${base.light}aa;
    flex-grow: 1;
`

const PageHeader = ({ title, children }) => {
  return (
    <Section>
      <Title>{title}</Title>
      {children}
    </Section>
  )
}

export default PageHeader