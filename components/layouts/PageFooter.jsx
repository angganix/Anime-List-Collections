import React from 'react'
import styled from "@emotion/styled"
import base from '../../styles/emotions/base'

const FooterWrapper = styled.footer`
    display: block;
    padding: 0.4rem 1rem;
    background: ${base.dark};
`

const FootNote = styled.p`
    text-align: center;
    color: ${base.light}44;
    padding: 0.4rem;
    font-size: 12px;
`

const PageFooter = () => {
    return (
        <FooterWrapper>
            <FootNote>
                Copyright &copy; 2022 ~ Angga Eko Pratama
            </FootNote>
        </FooterWrapper>
    )
}

export default PageFooter