import Head from "next/head";
import Image from "next/image";
import Main from "../components/layouts/Main";
import DataLoader from "../components/widgets/DataLoader";
import useAnimeList from "../hooks/useAnimeList";
import styled from "@emotion/styled";
import PageHeader from "../components/layouts/PageHeader";
import Skeleton from "react-loading-skeleton";

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
    width: 47.5%;
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
  &:hover {
    box-shadow: 0 4px 6px rgb(49 54 68 / 9%), 0 10px 40px rgb(49 54 68 / 30%);
  }
  ,
`;

const CardImage = styled.div`
  width: 100%;
  position: static;
`;

const CardContent = styled.div`
  padding: 0.8rem;
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

        <PageHeader title="Trending List" />

        <Section>
          <ListWrapper>
            {loading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                  <ListItem key={index}>
                    <Card>
                      <CardImage>
                        <Skeleton width="100%" height="132px" />
                      </CardImage>
                      <CardContent>
                        <Skeleton width="200px" height="10px" />
                        <Skeleton width="150px" height="10px" />
                        <Skeleton width="100px" height="10px" />
                      </CardContent>
                    </Card>
                  </ListItem>
                ))
              : list?.map((item, index) => (
                  <ListItem key={index}>
                    <Card>
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
                      <CardContent>
                        <h6>{item?.title?.romaji}</h6>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
          </ListWrapper>
          <button type="button" onClick={() => paginate(page + 1)}>
            Next
          </button>
        </Section>
      </div>
    </Main>
  );
}
