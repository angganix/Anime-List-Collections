import Head from "next/head";
import Main from "../components/layouts/Main";
import useAnimeList from "../hooks/useAnimeList";
import PageHeader from "../components/layouts/PageHeader";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { Button, IconButton } from "../components/styled/Button";
import {
  PaginationWrapper,
  PagingIcon,
  PagingLabel,
  Section,
} from "../components/styled/Anime";
import AnimeList from "../components/styled/AnimeList";

export default function Home() {
  const { list, loading, paginate, page, lastPage } = useAnimeList();
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

        <PageHeader title="All Anime">
          <IconButton color="#aaa" hoverColor="#fff" title="Search">
            <AiOutlineSearch />
          </IconButton>
          <IconButton color="#aaa" hoverColor="#fff" title="Sort">
            <FaSort />
          </IconButton>
        </PageHeader>

        <Section>
          <AnimeList loading={loading} list={list} />
          <PaginationWrapper>
            <Button
              disabled={page === 1}
              type="button"
              onClick={() => paginate(1)}
            >
              <PagingIcon>&laquo;</PagingIcon>{" "}
              <PagingLabel hideMobile>First</PagingLabel>
            </Button>
            <Button
              disabled={page === 1}
              type="button"
              onClick={() => paginate(page - 1)}
            >
              <PagingIcon>&lsaquo;</PagingIcon>{" "}
              <PagingLabel hideMobile>Previous</PagingLabel>
            </Button>
            <Button disabled={true} type="button">
              <PagingIcon>&nbsp;</PagingIcon>
              <PagingLabel>
                <strong>{page}</strong> of <strong>{lastPage}</strong>
              </PagingLabel>
              <PagingIcon>&nbsp;</PagingIcon>
            </Button>
            <Button
              disabled={page === lastPage}
              type="button"
              onClick={() => paginate(page + 1)}
            >
              <PagingLabel hideMobile>Next</PagingLabel>{" "}
              <PagingIcon>&rsaquo;</PagingIcon>
            </Button>
            <Button
              disabled={page === lastPage}
              type="button"
              onClick={() => paginate(lastPage)}
            >
              <PagingLabel hideMobile>Last</PagingLabel>{" "}
              <PagingIcon>&raquo;</PagingIcon>
            </Button>
          </PaginationWrapper>
        </Section>
      </div>
    </Main>
  );
}
