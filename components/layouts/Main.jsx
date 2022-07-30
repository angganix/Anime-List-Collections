import React from 'react'
import PageFooter from './PageFooter'
import TopNav from './TopNav'
import styled from '@emotion/styled'

const Main = ({ children }) => {
    return (
        <div>
            <TopNav />
            <div>
                {children}
            </div>
            <PageFooter />
        </div>
    )
}

export default Main