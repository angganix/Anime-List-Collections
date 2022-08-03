import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Main from "../../components/layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/widgets/Modal";
import { CollectionForm } from "../../components/widgets/Collection";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { removeCollection } from "../../store/reducers/collectionReducer";
import toast from "../../components/widgets/toast";
import {
  AddButton,
  CardImageWrapper,
  CollectionActions,
  CollectionCard,
  CollectionItem,
  CollectionTitle,
  EditButton,
  RemoveButton,
  SectionContentWrapper,
  SectionHeader,
  SectionHeading,
  SectionWrapper,
} from "../../components/styled/Collection";
import styled from "@emotion/styled";
import base from "../../styles/emotions/base";
import NoData from "../../components/widgets/NoData";
import noDataImage from "../../public/images/no-data.svg";

const AnimeCount = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0.5rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  background-color: ${base.light};
  font-weight: 400;
  font-size: 15px;
  z-index: 10;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.2rem;
  box-shadow: 0px 0px 4px ${base.dark}33;
  @media (max-width: 576px) {
    font-size: 13px;
    padding: 0.4rem 0.8rem;
  }
`;

const EmptyWrapper = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const EmptyTitle = styled.h2`
  display: block;
  color: ${base.dark}aa;
  font-weight: 400;
`;

const EmptyImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const AnimeCountLabel = styled.span`
  @media (max-width: 320px) {
    display: none;
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
        {list && list.length ? (
          <SectionHeader>
            <SectionHeading>All Collections</SectionHeading>
            <AddButton onClick={toggleForm}>Add New</AddButton>
          </SectionHeader>
        ) : null}
        <SectionContentWrapper>
          {list && list.length ? (
            list.map((collection) => (
              <CollectionItem key={collection?.id}>
                <CollectionCard>
                  <AnimeCount>
                    <strong>{collection?.anime?.length}</strong>
                    <AnimeCountLabel>Anime</AnimeCountLabel>
                  </AnimeCount>
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
            ))
          ) : (
            <NoData>
              <EmptyWrapper>
                <EmptyImageWrapper>
                  <Image alt="" src={noDataImage} layout="fill" />
                </EmptyImageWrapper>
                <EmptyTitle>There is no collections!</EmptyTitle>
                <AddButton onClick={toggleForm}>Add First Collection</AddButton>
              </EmptyWrapper>
            </NoData>
          )}
        </SectionContentWrapper>
      </SectionWrapper>
    </Main>
  );
};

export default CollectionList;
