import styled from "@emotion/styled"
import Link from "next/link"
import menuList from "../../data/menuList"
import base from "../../styles/emotions/base"
import { HiOutlineMenuAlt3 } from "react-icons/hi"

const menuStyle = `
    color: ${base.light}88;
    cursor: pointer;
    font-weight: 200;
    display: block;
    padding: 1.1rem;
    font-size: 14px;
    letter-spacing: 0.1rem;
    transition: all .2s ease-in-out;
    &:hover {
        color: white;
    }
`;

const NavHeader = styled.header`
    position: sticky;
    top: 0;
    background-color: ${base.dark};
    box-shadow: 0px 4px 8px #33333366;
    padding: 0 1rem;
    z-index: 1001;
`

const SiteBrand = styled.a`
    color: white;
    cursor: pointer;
    display: block;
    padding: 0.8rem 0.4rem;
    font-size: 20px;
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
    @media (max-width: 576px) {
        display: none;
    }
`

const ToggleMenu = styled.button`
    border-radius: 0.4rem;
    ${menuStyle}
    @media (min-width: 576px) {
        display: none;
    }
`

const MenuLink = styled.a`
    ${menuStyle}
`

const TopNav = () => {
    return (
        <NavHeader>
            <NavContainer>
                <Link href="/">
                    <SiteBrand>Anime List</SiteBrand>
                </Link>
                <MenuWrapper>
                    {menuList.map((menu, index) => (
                        <NavItem {...menu} key={index} />
                    ))}
                </MenuWrapper>
                <ToggleMenu>
                    <HiOutlineMenuAlt3 size={18} />
                </ToggleMenu>
            </NavContainer>
        </NavHeader>
    )
}

const NavItem = ({ path, label }) => (
    <li>
        <Link href={path}>
            <MenuLink>{label}</MenuLink>
        </Link>
    </li>
)

export default TopNav