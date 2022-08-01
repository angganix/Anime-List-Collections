import styled from "@emotion/styled";
import base from "../../styles/emotions/base";

const baseButton = `
    padding: 0.3rem 1rem;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
`

export const Button = styled.button`
    ${baseButton}
    background-color: ${props => props.disabled ? base.light : base.dark};
    color: ${props => props.disabled ? base.dark + "aa" : base.light};
    cursor: ${props => props.disabled ? 'inherit' : 'pointer'};
    box-shadow: 0px 0px 8px #33333333;
`

export const IconButton = styled.button`
    ${baseButton}
    padding: 0.6rem;
    font-size: 24px;
    color: ${props => props.color};
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
        color: ${props => props.hoverColor}
    }
`