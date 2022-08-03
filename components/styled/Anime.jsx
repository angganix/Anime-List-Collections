import styled from "@emotion/styled";
import base from "../../styles/emotions/base";

const badgeStyle = `
  border-radius: 50px;
  padding: 0.2rem 0.4rem;
  font-weight bold;
  font-size: 11px;
  min-width: max-content;
  text-shadow: 0px 0px 0.5px #222;
  box-shadow: 0px 0px 2px #22222277;
  &:first-of-type {
    margin-left: 0.4rem;
  }
  &:last-child {
    margin-right: 0.4rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 1.4rem;
  margin-top: -6rem;
  padding: 0 1rem;
  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: 576px) {
    gap: 0.8rem;
  }
`;

export const ListItem = styled.div`
  position: relative;
  width: ${props => props.forceWide ? '18.42%' : '18.5%'};
  @media (max-width: 576px) {
    width: 48%;
  }
  @media (max-width: 320px) {
    width: 47.8%;
  }
`;

export const Card = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  box-shadow: 0 4px 6px rgb(49 54 68 / 5%), 0 5px 20px rgb(49 54 68 / 8%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 4px 6px rgb(49 54 68 / 9%), 0 10px 40px rgb(49 54 68 / 30%);
  }
  ,
`;

export const CardImage = styled.div`
  width: 100%;
  position: static;
`;

export const AnimeTitle = styled.h5`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  width: 94%;
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 300;
  background: rgba(10, 10, 10, 0.5);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 576px) {
    padding: 0.3rem 0.4rem;
    font-size: 12px;
  }
`;

export const GenreWrapper = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem 0;
  @media (max-width: 576px) {
    bottom: 11%;
    overflow-x: auto;
  }
`;

export const GenreItem = styled.span`
  background: ${base.light};
  color: ${base.dark};
  ${badgeStyle}
`;

export const AnimeHead = styled.div`
  position: absolute;
  top: 0;
  left 0;
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

export const AnimeSeason = styled.span`
  ${badgeStyle}
  background: ${base.blue};
  color: ${base.light};
`;

export const AnimeScore = styled.span`
  ${badgeStyle}
  background: ${base.orange};
  color: ${base.light};
  font-size: 13px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
`;

export const PagingIcon = styled.span`
  font-size: 24px;
  margin-top: -0.2rem;
  font-weight: 300;
`;

export const PagingLabel = styled.span`
  font-size: 14px;
  font-weight: 300;
  @media (max-width : 576px) {
    display: ${props => props.hideMobile ? 'none' : 'block'};
  }
`;