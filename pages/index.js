import Head from "next/head";
import Image from "next/image";
import Main from "../components/layouts/Main";
import useAnimeList from "../hooks/useAnimeList";
import PageHeader from "../components/layouts/PageHeader";
import SkeletonLoader from "../components/widgets/SkeletonLoader";
import { AiOutlineSearch, AiOutlineStar } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { Button, IconButton } from "../components/styled/Button";
import Link from "next/link";
import {
  AnimeHead,
  AnimeScore,
  AnimeSeason,
  AnimeTitle,
  Card,
  CardImage,
  GenreItem,
  GenreWrapper,
  ListItem,
  ListWrapper,
  PaginationWrapper,
  PagingIcon,
  PagingLabel,
  Section,
} from "../components/styled/Anime";

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
                    <Link href={`/anime/${item?.id}`}>
                      <Card>
                        <AnimeHead>
                          {item?.season ? (
                            <AnimeSeason>{item?.season}</AnimeSeason>
                          ) : (
                            <div></div>
                          )}
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
                    </Link>
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
