import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Main from "../../components/layouts/Main";
import styled from "@emotion/styled";
import base from "../../styles/emotions/base";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/widgets/Modal";
import { CollectionForm } from "../../components/widgets/Collection";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { removeCollection } from "../../store/reducers/collectionReducer";
import toast from "../../components/widgets/toast";

const SectionWrapper = styled.div`
  padding: 1rem 4rem;
  margin-bottom: 1rem;
  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionHeading = styled.h2`
  color: ${base.dark}cc;
  font-weight: 400;
  display: block;
`;

const SectionContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CollectionCard = styled.div`
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

const CollectionTitle = styled.h4`
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
  font-weight: 400;
  @media (max-width: 576px) {
    font-size: 12px;
    padding: 0.2rem 0.4rem;
  }
`;

const CollectionItem = styled.div`
  width: 18.95%;
  @media (max-width: 576px) {
    width: 47.5%;
  }
`;

const CardImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AddButton = styled.button`
  cursor: pointer;
  padding: 0.6rem 0.8rem;
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

const actionButtons = `
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

const CollectionActions = styled.div`
  top: 0;
  right: 0;
  margin: 0.4rem;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
`;

const RemoveButton = styled.button`
  ${actionButtons}
  background-color: ${base.red}cc;
  &:hover {
    background-color: ${base.red};
  }
`;

const EditButton = styled.button`
  ${actionButtons}
  background-color: ${base.blue}cc;
  &:hover {
    background-color: ${base.blue};
  }
`;

const CollectionList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.collection);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const router = useRouter();

  const toggleForm = () => setShowForm(!showForm);

  const deleteCollection = (collection) => {
    Swal.fire({
      title: "Delete confirmation!",
      icon: "info",
      showCancelButton: true,
      text: `Delete ${collection?.name} collections ?`,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeCollection(collection));
        toast("info", `${collection?.name} has been deleted!`);
      }
    });
  };

  const editCollection = (collection) => {
    setSelected(collection);
    toggleForm();
  };

  useEffect(() => {
    if (!showForm) {
      setSelected(null);
    }
  }, [showForm]);

  return (
    <Main>
      <Head>
        <title>Collection List</title>
        <meta name="description" content="All my anime collections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        onHide={toggleForm}
        show={showForm}
        title={selected?.id ? "Edit Collection" : "Add New Collection"}
      >
        <CollectionForm onHide={toggleForm} data={selected} />
      </Modal>

      <SectionWrapper>
        <SectionHeader>
          <SectionHeading>All Collections</SectionHeading>
          <AddButton onClick={toggleForm}>Add New</AddButton>
        </SectionHeader>
        <SectionContentWrapper>
          {list.map((collection) => (
            <CollectionItem key={collection?.id}>
              <CollectionCard>
                <CollectionActions>
                  <RemoveButton onClick={() => deleteCollection(collection)}>
                    <AiOutlineDelete />
                  </RemoveButton>
                  <EditButton onClick={() => editCollection(collection)}>
                    <AiOutlineEdit />
                  </EditButton>
                </CollectionActions>
                <CardImageWrapper
                  onClick={() => router.push(`/collection/${collection?.id}`)}
                >
                  <Image
                    alt={`Anime collection ${collection?.name}`}
                    src={
                      collection?.anime[0]?.coverImage?.large ??
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                    }
                    priority
                    layout="fill"
                  />
                </CardImageWrapper>
                <CollectionTitle
                  onClick={() => router.push(`/collection/${collection?.id}`)}
                >
                  {collection?.name}
                </CollectionTitle>
              </CollectionCard>
            </CollectionItem>
          ))}
        </SectionContentWrapper>
      </SectionWrapper>
    </Main>
  );
};

export default CollectionList;
