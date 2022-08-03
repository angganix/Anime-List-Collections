import React from 'react'
import PageFooter from './PageFooter'
import TopNav from './TopNav'

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