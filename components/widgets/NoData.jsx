import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'

const NoDataWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.4rem;
`

const NoData = ({ children }) => {
    return (
        <NoDataWrapper>
            {children}
        </NoDataWrapper>
    )
}

export default NoData