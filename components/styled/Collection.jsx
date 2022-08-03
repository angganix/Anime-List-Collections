import styled from "@emotion/styled"
import base from "../../styles/emotions/base"

export const SectionWrapper = styled.div`
  padding: 1rem 4rem;
  margin-bottom: 1rem;
  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SectionHeading = styled.h2`
  color: ${base.dark}cc;
  font-weight: 400;
  display: block;
  @media (max-width: 576px) {
    font-size: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const SectionContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CollectionCard = styled.div`
  position: relative;
  width: 100%;
  display: block;
  background: white;
  min-height: 280px;
  border-radius: 0.6rem;
  overflow: hidden;
  box-shadow: 0px 4px 6px ${base.dark}22;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 0px 4px 12px ${base.dark}44;
  }
  @media (max-width: 576px) {
    min-height: 200px;
  }
`;

export const CollectionTitle = styled.h4`
  position: absolute;
  margin-bottom: 1rem;
  bottom: 0;
  left: 0;
  padding: 0.4rem 0.8rem;
  color: white;
  background-color: ${base.dark}cc;
  width: max-content;
  border-top-right-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  font-size: 14px;
  font-weight: 300;
  @media (max-width: 576px) {
    font-size: 11.5px;
    padding: 0.2rem 0.4rem;
    max-width: 90%;
  }
`;

export const CollectionItem = styled.div`
  width: 18.95%;
  @media (max-width: 576px) {
    width: 47.5%;
  }
  @media (max-width: 320px) {
    width: 47%;
  }
`;

export const CardImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const AddButton = styled.button`
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  background-color: ${base.dark}cc;
  color: white;
  font-size: 16px;
  box-shadow: 0px 0px 4px ${base.dark}44;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${base.dark}ee;
  }
`;

export const actionButtons = `
    cursor: pointer;
    padding: 0.6rem;
    border-radius: 0.5rem;
    color: white;
    font-size: 15px;
    transition: all 0.2s ease-in-out;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CollectionActions = styled.div`
  top: 0;
  right: 0;
  margin: 0.4rem;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
`;

export const RemoveButton = styled.button`
  ${actionButtons}
  background-color: ${base.red}cc;
  &:hover {
    background-color: ${base.red};
  }
`;

export const EditButton = styled.button`
  ${actionButtons}
  background-color: ${base.blue}cc;
  &:hover {
    background-color: ${base.blue};
  }
`;