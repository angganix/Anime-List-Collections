import React from 'react'
import PageFooter from './PageFooter'
import TopNav from './TopNav'
import styled from '@emotion/styled'

const MainWrapper = styled.main`
    padding: 1rem;
`

const Main = ({ children }) => {
    return (
        <div>
            <TopNav />
            <MainWrapper>
                {children}
            </MainWrapper>
            <PageFooter />
        </div>
    )
}

export default Main