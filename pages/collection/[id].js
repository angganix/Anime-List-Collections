import Head from "next/head";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../../components/layouts/Main";
import AnimeList from "../../components/styled/AnimeList";
import {
  AddButton,
  SectionHeader,
  SectionHeading,
  SectionWrapper,
} from "../../components/styled/Collection";
import { CollectionForm } from "../../components/widgets/Collection";
import Modal from "../../components/widgets/Modal";
import { useRouter } from "next/router";
import NoData from "../../components/widgets/NoData";
import styled from "@emotion/styled";
import base from "../../styles/emotions/base";
import noDataImage from "../../public/images/no-data.svg";
import Image from "next/image";
import Swal from "sweetalert2";
import { removeFromCollection } from "../../store/reducers/collectionReducer";
import toast from "../../components/widgets/toast";

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

const CollectionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const collection = useSelector((state) => state.collection.list).find(
    (item) => {
      return item.id === id;
    }
  );

  const toggleForm = () => setShowForm(!showForm);

  const deleteAnime = ({ id: animeId, title }) => {
    Swal.fire({
      title: "Remove confirmation!",
      icon: "info",
      html: `<p style="text-align:center;">Remove <strong>${title}</strong> from <strong>${collection?.name}</strong> collections?</p>`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(
          removeFromCollection({
            collectionId: id,
            animeId: animeId,
          })
        );
        toast("info", `${title} has been removed from ${collection?.name}`);
      }
    });
  };

  if (!collection) {
    return (
      <Main>
        <SectionWrapper>
          <h1>No Data Found!</h1>
        </SectionWrapper>
      </Main>
    );
  }

  return (
    <Main>
      <Head>
        <title>{collection?.name} Collections</title>
        <meta name="description" content={`${collection?.name} collections`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        onHide={toggleForm}
        show={showForm}
        title={collection?.id ? "Edit Collection" : "Add New Collection"}
      >
        <CollectionForm
          onHide={toggleForm}
          data={{
            id: collection?.id,
            name: collection?.name,
          }}
        />
      </Modal>

      <SectionWrapper>
        <SectionHeader>
          <SectionHeading>{collection?.name} List</SectionHeading>
          <AddButton onClick={toggleForm}>Edit</AddButton>
        </SectionHeader>
        {collection?.anime && collection?.anime.length ? (
          <AnimeList
            loading={false}
            list={collection?.anime}
            actions={true}
            deleteAnime={deleteAnime}
            wide={true}
          />
        ) : (
          <NoData>
            <EmptyWrapper>
              <EmptyImageWrapper>
                <Image alt="" src={noDataImage} layout="fill" />
              </EmptyImageWrapper>
              <EmptyTitle>No anime on this collections!</EmptyTitle>
              <AddButton onClick={() => router.push("/")}>Add Anime</AddButton>
            </EmptyWrapper>
          </NoData>
        )}
      </SectionWrapper>
    </Main>
  );
};

export default CollectionDetail;
