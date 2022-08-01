import Head from "next/head";
import React from "react";
import Main from "../../components/layouts/Main";
import styled from "@emotion/styled";
import useAnimeDetail from "../../hooks/useAnimeDetail";
import base from "../../styles/emotions/base";
import { CardImage } from "../../components/styled/Anime";
import Image from "next/image";

const baseColumn = `
    display: flex;
    position: relative;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1.4rem;
    flex-direction: row;
`;

const Section = styled.section`
  margin-bottom: 1.4rem;
  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
`;

const GenreWrapper = styled.div`
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

const GenreItem = styled.span`
  border-radius: 50px;
  padding: 0.2rem 0.4rem;
  font-size: 11.5px;
  background-color: ${base.light};
  box-shadow: 0px 0px 2px #88888844;
`;

const ColumnWrapper = styled.section`
  ${baseColumn}
  padding: 1rem;
  margin: 4rem 4rem 0 4rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 12px #cccccc33;
  @media (max-width: 576px) {
    flex-direction: column;
    margin: 4rem 0.4rem 0.4rem 4rem;
  }
`;

const ColumnContainer = styled.section`
  ${baseColumn}
  margin: 1rem 4rem 0 4rem;
  @media (max-width: 576px) {
    flex-direction: column;
    margin: 1rem 0.4rem 0.4rem 4rem;
  }
`;

const InfoColumn = styled.aside`
  width: ${(props) => (props.noGap ? "225px" : "200px")};
  flex-shrink: 0;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ContentColumn = styled.div`
  flex-grow: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CardInfo = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0px 0px 12px #cccccc33;
`;

const AnimeTitle = styled.h3`
  color: ${base.dark}88;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const AnimeDescription = styled.p`
  color: ${base.dark}88;
  font-size: 15px;
`;

const InfoDataGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;

const InfoDataLabel = styled.label`
  color: ${base.dark}77;
  font-weight: 400;
  font-size: 12.5px;
`;

const InfoDataValue = styled.div`
  color: ${base.dark};
  font-weight: 500;
  font-size: 13px;
  white-space: wrap;
`;

const SectionContent = styled.section`
  margin-bottom: 1.5rem;
`;

const SectionContentTitle = styled.h4`
  color: ${base.dark}88;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const SectionContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CharacterColumnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0px 0px 12px #cccccc33;
  width: 49%;
`;

const CharacterData = styled.div`
  width: 45%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5em;
`;

const CharacterDataName = styled.h5`
  color: ${base.dark}88;
`;

const CharacterDataDetail = styled.h6`
  color: ${base.dark}66;
`;

const CharacterDataWrapper = styled.div`
  padding: 0.5rem 0;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: ${(props) => (props.endAlign ? "flex-end" : "flex-start")};
  flex-direction: column;
  min-height: 70px;
`;

const CharacterImageWrapper = styled.div`
  width: 30%;
`;

const AnimeDetail = () => {
  const { data, loading } = useAnimeDetail();

  return (
    <Main>
      <div>
        <Head>
          <title>Anime Detail</title>
          <meta name="description" content="Detail anime page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Section>
          {data ? (
            <>
              <ColumnWrapper>
                <InfoColumn>
                  <CardImage style={{ marginTop: "-4rem" }}>
                    <Image
                      src={data?.coverImage?.large}
                      width="100%"
                      height="132px"
                      layout="responsive"
                      priority
                      style={{ borderRadius: "0.5rem" }}
                      alt={data?.title?.romaji}
                    />
                  </CardImage>
                  <GenreWrapper>
                    {data?.genres?.slice(0, 3)?.map((genre) => (
                      <GenreItem key={genre}>{genre}</GenreItem>
                    ))}
                  </GenreWrapper>
                </InfoColumn>
                <ContentColumn>
                  <AnimeTitle>{data?.title?.romaji}</AnimeTitle>
                  <AnimeDescription
                    dangerouslySetInnerHTML={{
                      __html: data?.description ?? "No description yet...",
                    }}
                  />
                </ContentColumn>
              </ColumnWrapper>
              <ColumnContainer>
                <InfoColumn noGap>
                  <CardInfo>
                    <InfoDataGroup>
                      <InfoDataLabel>Format</InfoDataLabel>
                      <InfoDataValue>{data?.format}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Episodes</InfoDataLabel>
                      <InfoDataValue>{data?.episodes}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Episode Duration</InfoDataLabel>
                      <InfoDataValue>{data?.duration} mins</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Status</InfoDataLabel>
                      <InfoDataValue>{data?.status}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Season</InfoDataLabel>
                      <InfoDataValue>{data?.season}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Score</InfoDataLabel>
                      <InfoDataValue>{data?.averageScore / 10}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Source</InfoDataLabel>
                      <InfoDataValue>{data?.source}</InfoDataValue>
                    </InfoDataGroup>
                    <InfoDataGroup>
                      <InfoDataLabel>Studios</InfoDataLabel>
                      <InfoDataValue>
                        {data?.studios?.edges?.map((studio) => (
                          <span
                            style={{ display: "block" }}
                            key={studio?.node?.name}
                          >
                            {studio?.node?.name}
                          </span>
                        ))}
                      </InfoDataValue>
                    </InfoDataGroup>
                  </CardInfo>
                </InfoColumn>
                <ContentColumn>
                  <SectionContent>
                    <SectionContentTitle>Characters</SectionContentTitle>
                    <SectionContentWrapper>
                      {data?.characters?.edges?.map((character, index) => (
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
                              <CharacterDataName>
                                {character?.voiceActors[0]?.name?.full}
                              </CharacterDataName>
                              <CharacterDataDetail>
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
                      ))}
                    </SectionContentWrapper>
                  </SectionContent>
                </ContentColumn>
              </ColumnContainer>
            </>
          ) : null}
        </Section>
      </div>
    </Main>
  );
};

export default AnimeDetail;
