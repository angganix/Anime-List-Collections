import React from 'react'
import styled from "@emotion/styled"
import base from '../../styles/emotions/base';

const Section = styled.section`
  margin-bottom: 1rem;
`;

const Title = styled.h1`
    color: ${base.dark}aa;
`

const PageHeader = ({ title }) => {
    return (
        <Section>
            <Title>{title}</Title>
        </Section>
    )
}

export default PageHeader