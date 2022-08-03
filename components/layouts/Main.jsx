import styled from '@emotion/styled'
import React from 'react'
import PageFooter from './PageFooter'
import TopNav from './TopNav'

const MainWrapper = styled.div`
    min-height: 80vh;
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