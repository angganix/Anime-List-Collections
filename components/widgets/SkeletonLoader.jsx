import React from 'react'
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

const skeletonAnimation = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #cacaca;
  }
`

const Skeleton = styled.div`
  animation: ${skeletonAnimation} 1s linear infinite alternate;
  display: block;
  margin-bottom: ${props => props.noGap ? '0' : '0.5rem'};
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 0.2rem;
`

const SkeletonLoader = ({ width = "100%", height = "15px", noGap = false }) => {
  return <Skeleton width={width} height={height} noGap={noGap} />
}

export default SkeletonLoader