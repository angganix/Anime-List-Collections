import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
`

const spin = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`
const Spinner = styled.div`
    animation: ${spin} .8s linear infinite;
`

const DataLoader = () => {
    return (
        <LoaderWrapper>
            <Spinner>
                <AiOutlineLoading3Quarters size={15} style={{ marginBottom: -1.5 }} />
            </Spinner>
            <span>Loading Data</span>
        </LoaderWrapper>
    )
}

export default DataLoader