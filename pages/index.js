import Head from "next/head";
import Image from "next/image";
import Main from "../components/layouts/Main";
import DataLoader from "../components/widgets/DataLoader";
import useAnimeList from "../hooks/useAnimeList";
import styled from "@emotion/styled";
import PageHeader from "../components/layouts/PageHeader";
import SkeletonLoader from "../components/widgets/SkeletonLoader";
import base from "../styles/emotions/base";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { Button, IconButton } from "../components/styled/Button";

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

const Section = styled.section`
  margin-bottom: 1.4rem;
  margin-top: -6rem;
  padding: 0 1rem;
  @media (max-width: 576px) {
    padding: 0 0.5rem;
  }
`;

const ListWrapper = styled.div`
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

const ListItem = styled.div`
  width: 18.5%;
  @media (max-width: 576px) {
    width: 48%;
  }
  @media (max-width: 320px) {
    width: 47.8%;
  }
`;

const Card = styled.div`
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
    box-shadow: 0 4px 6px rgb(49 54 68 / 9%), 0 10px 40px rgb(49 54 68 / 30%);
  }
  ,
`;

const CardImage = styled.div`
  width: 100%;
  position: static;
`;

const AnimeTitle = styled.h5`
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

const GenreWrapper = styled.div`
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

const GenreItem = styled.span`
  background: ${base.light};
  color: ${base.dark};
  ${badgeStyle}
`;

const AnimeHead = styled.div`
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

const AnimeSeason = styled.span`
  ${badgeStyle}
  background: ${base.blue};
  color: ${base.light};
`;

const AnimeScore = styled.span`
  ${badgeStyle}
  background: ${base.orange};
  color: ${base.light};
  font-size: 13px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem auto;
`;

const PagingIcon = styled.span`
  font-size: 24px;
  margin-top: -0.2rem;
  font-weight: 300;
`;

const PagingLabel = styled.span`
  font-size: 14px;
  font-weight: 300;
`;

export default function Home() {
  const { list, loading, paginate, page } = useAnimeList();

  return (
    <Main>
      <div>
        <Head>
          <title>Anime List</title>
          <meta
            name="description"
            content="All you need to knowing latest anime list by popularity or trend"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <PageHeader title="Trending List">
          <IconButton color="#aaa" hoverColor="#fff" title="Search">
            <AiOutlineSearch />
          </IconButton>
          <IconButton color="#aaa" hoverColor="#fff" title="Sort">
            <FaSort />
          </IconButton>
        </PageHeader>

        <Section>
          <ListWrapper>
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                  <ListItem key={index}>
                    <Card>
                      <CardImage>
                        <SkeletonLoader height="280px" />
                      </CardImage>
                    </Card>
                  </ListItem>
                ))
              : list?.map((item, index) => (
                  <ListItem key={index}>
                    <Card>
                      <AnimeHead>
                        <AnimeSeason>{item?.season}</AnimeSeason>
                        <AnimeScore>
                          <AiOutlineStar
                            style={{ marginBottom: -1.8, marginRight: 1.5 }}
                          />
                          <span>{item?.averageScore / 10}</span>
                        </AnimeScore>
                      </AnimeHead>
                      <CardImage>
                        <Image
                          src={item?.coverImage?.large}
                          width="100%"
                          height="132px"
                          layout="responsive"
                          priority
                          alt={item?.title?.romaji}
                        />
                      </CardImage>
                      <GenreWrapper>
                        {item?.genres?.slice(0, 3)?.map((genre) => (
                          <GenreItem key={genre}>{genre}</GenreItem>
                        ))}
                      </GenreWrapper>
                      <AnimeTitle title={item?.title?.romaji}>
                        {item?.title?.romaji}
                      </AnimeTitle>
                    </Card>
                  </ListItem>
                ))}
          </ListWrapper>
          <PaginationWrapper>
            <Button
              disabled={page === 1}
              type="button"
              onClick={() => paginate(page - 1)}
            >
              <PagingIcon>&laquo;</PagingIcon>{" "}
              <PagingLabel>Previous</PagingLabel>
            </Button>
            <Button type="button" onClick={() => paginate(page + 1)}>
              <PagingLabel>Next</PagingLabel> <PagingIcon>&raquo;</PagingIcon>
            </Button>
          </PaginationWrapper>
        </Section>
      </div>
    </Main>
  );
}
