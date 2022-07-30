import Head from "next/head";
import Image from "next/image";
import Main from "../components/layouts/Main";
import DataLoader from "../components/widgets/DataLoader";
import useAnimeList from "../hooks/useAnimeList";
import styled from "@emotion/styled";
import PageHeader from "../components/layouts/PageHeader";

const Section = styled.section`
  margin-bottom: 1.4rem;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  flex-direction: row;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ListItem = styled.div`
  width: 31.5%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  box-shadow: 0 4px 6px rgb(49 54 68 / 5%), 0 5px 20px rgb(49 54 68 / 8%);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 6px rgb(49 54 68 / 9%), 0 10px 40px rgb(49 54 68 / 30%);
  }
  ,
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const CardImage = styled.div`
  width: 40%;
  position: static;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

export default function Home() {
  const { list, loading, paginate } = useAnimeList();

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

        <PageHeader title="Anime List" />

        <Section>
          {loading ? (
            <DataLoader />
          ) : (
            <ListWrapper>
              {list?.map((item, index) => (
                <ListItem key={index}>
                  <Card>
                    <CardImage>
                      <Image
                        src={item?.coverImage?.large}
                        width="100%"
                        height="132px"
                        layout="responsive"
                        priority
                      />
                    </CardImage>
                    <CardContent>
                      <h6>{item?.title?.romaji}</h6>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </ListWrapper>
          )}
        </Section>
      </div>
    </Main>
  );
}
