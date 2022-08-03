import styled from "@emotion/styled"
import Link from "next/link"
import menuList from "../../data/menuList"
import base from "../../styles/emotions/base"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useRouter } from "next/router"
import { AiOutlineClose } from "react-icons/ai"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const menuStyle = `
    cursor: pointer;
    font-weight: 200;
    padding: 1.1rem;
    font-size: 14px;
    letter-spacing: 0.1rem;
    transition: all .2s ease-in-out;
    &:hover {
        color: white;
    }
`;

const NavHeader = styled.header`
    position: static;
    top: 0;
    background-color: ${base.dark};
    padding: 1rem 4rem 0.8rem;
    z-index: 1001;
    @media (max-width: 576px) {
        padding: 0 0.3rem;
        position: sticky;
    }
`

const SiteBrand = styled.a`
    color: white;
    cursor: pointer;
    display: block;
    padding: 0.8rem 0.4rem;
    font-size: 20px;
    font-weight: bold;
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MenuWrapper = styled.ul`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all .2s ease-in-out;
    @media (max-width: 576px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${base.dark};
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 3rem 0;
        margin-left: ${props => props.show ? '0' : '-100%'};
    }
`

const ToggleMenu = styled.button`
    border-radius: 0.4rem;
    color: white;
    display: none;
    ${menuStyle}
    @media (max-width: 576px) {
        display: block;
        z-index: 1000;
    }
`

const MenuLink = styled.a`
    ${menuStyle}
    color: ${props => props.active ? 'white' : base.light + '88'};
    @media (max-width: 576px) {
        padding: 0.8rem 2rem;
        width: 100%;
        display: block;
    }
`

const MenuItem = styled.li`
    display: block;
    position: relative;
    @media (max-width: 576px) {
        width: 100%;
    }
`

const CollectionCount = styled.span`
    position: absolute;
    top: -0.5rem;
    right: 0;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px;
    height: 14px;
    padding: 0.3rem;
    border-radius: 50px;
    font-weight: 500;
    background-color: ${base.blue};
    color: white;
    @media (max-width: 576px) {
        top: 50%;
        right: 1.4rem;
        transform: translateY(-50%);
    }
`

const TopNav = () => {
    const collectionCount = useSelector(state => state.collection.list).length;
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => setShowSidebar(!showSidebar);

    return (
        <NavHeader>
            <NavContainer>
                <Link href="/">
                    <SiteBrand>Anime List</SiteBrand>
                </Link>
                <MenuWrapper show={showSidebar}>
                    {menuList.map((menu, index) => (
                        <NavItem {...menu} key={index} collectionCount={collectionCount} />
                    ))}
                </MenuWrapper>
                <ToggleMenu onClick={toggleSidebar}>
                    {showSidebar ? (
                        <AiOutlineClose size={18} style={{ marginBottom: -1.5 }} />
                    ) : (
                        <HiOutlineMenuAlt3 size={18} style={{ marginBottom: -1.5 }} />
                    )}
                </ToggleMenu>
            </NavContainer>
        </NavHeader>
    )
}

const NavItem = ({ path, label, collectionCount }) => {
    const router = useRouter();
    return (
        <MenuItem>
            {path === "/collection" ? (
                <CollectionCount>{collectionCount}</CollectionCount>
            ) : null}
            <Link href={path}>
                <MenuLink active={router.pathname === path ? true : false}>{label}</MenuLink>
            </Link>
        </MenuItem>
    )
}

export default TopNav