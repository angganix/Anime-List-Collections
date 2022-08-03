import styled from "@emotion/styled";
import base from "../../styles/emotions/base";

export const baseColumn = `
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.4rem;
    flex-direction: row;
`;

export const Section = styled.section`
  margin-bottom: 1.4rem;
  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
`;

export const GenreWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 0.8rem 0;
  @media (max-width: 576px) {
    flex-wrap: nowrap;
    overflow-x: auto;
  }
`;

export const GenreItem = styled.span`
  border-radius: 50px;
  padding: 0.2rem 0.4rem;
  font-size: 11.5px;
  background-color: ${base.light};
  box-shadow: 0px 0px 2px #88888844;
`;

export const ColumnWrapper = styled.section`
  ${baseColumn}
  padding: 1rem;
  margin: 4rem 4rem 0 4rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 12px #cccccc33;
  position: relative;
  @media (max-width: 576px) {
    flex-direction: column;
    margin: 4rem 0.4rem 0.4rem 0.4rem;
  }
`;

export const ColumnContainer = styled.section`
  ${baseColumn}
  margin: 1rem 4rem 0 4rem;
  @media (max-width: 576px) {
    flex-direction: column;
    margin: 1rem 0.4rem 0.4rem 0.4rem;
  }
`;

export const InfoColumn = styled.aside`
  width: ${(props) => (props.noGap ? "225px" : "200px")};
  flex-shrink: 0;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  position: sticky;
  top: 1rem;
  @media (max-width: 576px) {
    width: 100%;
    position: static;
  }
`;

export const ContentColumn = styled.div`
  flex-grow: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const CardInfo = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0px 0px 12px #cccccc33;
`;

export const AnimeTitle = styled.h3`
  color: ${base.dark}88;
  font-weight: 500;
  padding: 1rem 0 0;
  margin-bottom: 1rem;
`;

export const AnimeDescription = styled.p`
  color: ${base.dark}88;
  font-size: 15px;
`;

export const InfoDataGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;

export const InfoDataLabel = styled.label`
  color: ${base.dark}77;
  font-weight: 400;
  font-size: 12.5px;
`;

export const InfoDataValue = styled.div`
  color: ${base.dark};
  font-weight: 500;
  font-size: 13px;
  white-space: wrap;
`;

export const SectionContent = styled.section`
  margin-bottom: 1.5rem;
`;

export const SectionContentTitle = styled.h4`
  color: ${base.dark}88;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const SectionContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const CharacterColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0px 0px 12px #cccccc33;
  width: 49%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

export const CharacterData = styled.div`
  width: 45%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5em;
`;

export const CharacterDataName = styled.h5`
  color: ${base.dark}88;
  text-align: ${(props) => (props.endAlign ? "right" : "left")};
`;

export const CharacterDataDetail = styled.h6`
  color: ${base.dark}66;
  text-align: ${(props) => (props.endAlign ? "right" : "left")};
`;

export const CharacterDataWrapper = styled.div`
  padding: 0.5rem 0;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.endAlign ? "flex-end" : "flex-start")};
  flex-direction: column;
  min-height: 100px;
  @media (max-width: 576px) {
    min-height: 70px;
  }
`;

export const CharacterImageWrapper = styled.div`
  width: 50%;
`;

export const AddCollection = styled.button`
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  z-index: 2;
  border-radius: 0.6rem;
  box-shadow: 0px 0px 8px ${base.pink}44;
  background-color: ${base.pink};
  color: white;
  position: absolute;
  top: -1.4rem;
  font-size: 17px;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  transition: all .2s ease-in-out;
  &:hover {
    background-color: ${base.pink}cc;
  }
  @media (max-width: 576px) {
    right: 0;
    top: 18rem;
  }
`;

export const CollectionItem = styled.a`
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 50px;
  box-shadow: 0px 0px 8px ${base.pink}44;
  background-color: ${props => props.color ? props.color : base.dark}cc;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  font-size: 16px;
  transition: all .2s ease-in-out;
  &:hover {
      background-color: ${props => props.color ? props.color : base.dark};
  }
  @media (max-width: 576px) {
      font-size: 13px;
  }
`