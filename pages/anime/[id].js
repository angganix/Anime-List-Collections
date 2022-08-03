import Head from "next/head";
import React, { useState } from "react";
import Main from "../../components/layouts/Main";
import useAnimeDetail from "../../hooks/useAnimeDetail";
import { CardImage } from "../../components/styled/Anime";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import SkeletonLoader from "../../components/widgets/SkeletonLoader";
import Modal from "../../components/widgets/Modal";
import {
  AddCollection,
  AnimeDescription,
  AnimeTitle,
  CardInfo,
  CharacterColumnWrapper,
  CharacterData,
  CharacterDataDetail,
  CharacterDataName,
  CharacterDataWrapper,
  CharacterImageWrapper,
  CollectionItem,
  ColumnContainer,
  ColumnWrapper,
  ContentColumn,
  GenreItem,
  GenreWrapper,
  InfoColumn,
  InfoDataGroup,
  InfoDataLabel,
  InfoDataValue,
  Section,
  SectionContent,
  SectionContentTitle,
  SectionContentWrapper,
} from "../../components/styled/AnimeDetail";
import Collection from "../../components/widgets/Collection";
import { useSelector } from "react-redux";
import Link from "next/link";

const AnimeDetail = () => {
  const { list } = useSelector((state) => state.collection);
  const { data, loading } = useAnimeDetail();
  const [showModal, setShowModal] = useState(false);

  const animeCollections = () => {
    const result = list
      .filter((item) => {
        return item.anime.find((anime) => anime.id === data?.id);
      })
      .map((item) => ({ id: item.id, name: item.name }));
    return result;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Main>
      <div>
        <Head>
          <title>Anime Detail - {data?.title?.romaji}</title>
          <meta
            name="description"
            content={`Add ${data?.title?.romaji} to your collection`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Section>
          <Modal show={showModal} onHide={toggleModal}>
            <Collection data={data} closeForm={toggleModal} />
          </Modal>
          <>
            <ColumnWrapper>
              {!loading ? (
                <AddCollection onClick={toggleModal}>
                  <AiOutlineHeart size={24} />
                  <span>Add Collection</span>
                </AddCollection>
              ) : null}
              <InfoColumn>
                <CardImage style={{ marginTop: "-4rem" }}>
                  {loading ? (
                    <SkeletonLoader height="264px" noGap />
                  ) : data ? (
                    <Image
                      src={data?.coverImage?.large}
                      width="100%"
                      height="132px"
                      layout="responsive"
                      priority
                      style={{ borderRadius: "0.5rem" }}
                      alt={data?.title?.romaji}
                    />
                  ) : null}
                </CardImage>
                <GenreWrapper>
                  {loading ? (
                    <SkeletonLoader height="20px" noGap />
                  ) : (
                    data?.genres
                      ?.slice(0, 3)
                      ?.map((genre) => (
                        <GenreItem key={genre}>{genre}</GenreItem>
                      ))
                  )}
                </GenreWrapper>
              </InfoColumn>
              <ContentColumn>
                <AnimeTitle>
                  {loading ? (
                    <SkeletonLoader width="200px" height="22px" />
                  ) : (
                    data?.title?.romaji
                  )}
                </AnimeTitle>
                {!loading ? (
                  <AnimeDescription
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.description && !loading
                          ? data?.description
                          : null,
                    }}
                  />
                ) : (
                  [1, 2, 3, 4, 5].map((desc) => (
                    <SkeletonLoader key={desc} width={`${100 / desc}%`} />
                  ))
                )}
              </ContentColumn>
            </ColumnWrapper>
            <ColumnContainer>
              <InfoColumn noGap>
                <CardInfo>
                  <AnimeInfoGroup
                    label="Format"
                    value={data ? data?.format : null}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Episodes"
                    value={data?.episodes}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Episode Duration"
                    value={`${data ? data?.duration : null} mins`}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Status"
                    value={data ? data?.status : null}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Season"
                    value={data ? data?.season : null}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Score"
                    value={data ? data?.averageScore / 10 : null}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Source"
                    value={data ? data?.source : null}
                    loading={loading}
                  />
                  <AnimeInfoGroup
                    label="Studios"
                    value={
                      data
                        ? data?.studios?.edges?.map((studio) => (
                            <span
                              style={{ display: "block" }}
                              key={studio?.node?.name}
                            >
                              {studio?.node?.name}
                            </span>
                          ))
                        : null
                    }
                    loading={loading}
                  />
                </CardInfo>
              </InfoColumn>
              <ContentColumn>
                {animeCollections().length ? (
                  <SectionContent>
                    <SectionContentTitle>
                      {loading ? (
                        <SkeletonLoader width="18%" height="15px" />
                      ) : (
                        "Added to below collections"
                      )}
                    </SectionContentTitle>
                    <SectionContentWrapper>
                      {loading
                        ? [1, 2, 3].map((collection) => (
                            <SkeletonLoader
                              width="18%"
                              height="25px"
                              key={collection}
                            />
                          ))
                        : animeCollections().map((collection) => (
                            <Link
                              key={collection.id}
                              href={`/collection/${collection.id}`}
                            >
                              <CollectionItem>{collection.name}</CollectionItem>
                            </Link>
                          ))}
                    </SectionContentWrapper>
                  </SectionContent>
                ) : (
                  <SectionContent>
                    <SectionContentTitle>
                      You haven&apos;t added this anime to any collections yet
                    </SectionContentTitle>
                  </SectionContent>
                )}
                <SectionContent>
                  <SectionContentTitle>
                    {loading ? (
                      <SkeletonLoader width="20%" height="15px" />
                    ) : (
                      "Characters"
                    )}
                  </SectionContentTitle>
                  <SectionContentWrapper>
                    {loading ? (
                      [1, 2, 3, 4, 5, 6].map((char) => (
                        <CharacterColumnWrapper key={char}>
                          <CharacterData>
                            <CharacterImageWrapper>
                              <SkeletonLoader noGap height="132px" />
                            </CharacterImageWrapper>
                            <CharacterDataWrapper>
                              <CharacterDataName>
                                <SkeletonLoader noGap width="100px" />
                              </CharacterDataName>
                              <CharacterDataDetail>
                                <SkeletonLoader noGap width="80px" />
                              </CharacterDataDetail>
                            </CharacterDataWrapper>
                          </CharacterData>
                          <CharacterData>
                            <CharacterDataWrapper endAlign>
                              <CharacterDataName endAlign>
                                <SkeletonLoader noGap width="100px" />
                              </CharacterDataName>
                              <CharacterDataDetail endAlign>
                                <SkeletonLoader noGap width="80px" />
                              </CharacterDataDetail>
                            </CharacterDataWrapper>
                            <CharacterImageWrapper>
                              <SkeletonLoader noGap height="132px" />
                            </CharacterImageWrapper>
                          </CharacterData>
                        </CharacterColumnWrapper>
                      ))
                    ) : (
                      <AnimeCharacter data={data} />
                    )}
                  </SectionContentWrapper>
                </SectionContent>
              </ContentColumn>
            </ColumnContainer>
          </>
        </Section>
      </div>
    </Main>
  );
};

const AnimeInfoGroup = ({ label, value, loading = true }) => (
  <InfoDataGroup>
    <InfoDataLabel>
      {loading ? <SkeletonLoader width="40%" height="10px" /> : label}
    </InfoDataLabel>
    <InfoDataValue>
      {loading ? <SkeletonLoader width="60%" height="10px" /> : value}
    </InfoDataValue>
  </InfoDataGroup>
);

const AnimeCharacter = ({ data }) =>
  data
    ? data?.characters?.edges?.map((character, index) => (
        <CharacterColumnWrapper key={index}>
          <CharacterData>
            <CharacterImageWrapper>
              <Image
                src={character?.node?.image?.large}
                width="100%"
                height="132px"
                layout="responsive"
                priority
                alt={character?.node?.name?.full}
              />
            </CharacterImageWrapper>
            <CharacterDataWrapper>
              <CharacterDataName>
                {character?.node?.name?.full}
              </CharacterDataName>
              <CharacterDataDetail>
                {character?.node?.media?.edges[0].characterRole}
              </CharacterDataDetail>
            </CharacterDataWrapper>
          </CharacterData>
          <CharacterData>
            <CharacterDataWrapper endAlign>
              <CharacterDataName endAlign>
                {character?.voiceActors[0]?.name?.full}
              </CharacterDataName>
              <CharacterDataDetail endAlign>
                {character?.voiceActors[0]?.languageV2}
              </CharacterDataDetail>
            </CharacterDataWrapper>
            <CharacterImageWrapper>
              <Image
                src={character?.voiceActors[0]?.image?.large}
                width="100%"
                height="132px"
                layout="responsive"
                priority
                alt={character?.voiceActors[0]?.name?.full}
              />
            </CharacterImageWrapper>
          </CharacterData>
        </CharacterColumnWrapper>
      ))
    : null;

export default AnimeDetail;
