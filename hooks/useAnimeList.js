import { useEffect, useState } from "react";
import { ANIME_LIST } from "../utils/queries";

const useAnimeList = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);
  const [lastPage, setLastPage] = useState(0);

  const getData = async () => {
    setLoading(true);
    const result = await ANIME_LIST(page);
    setList(result?.data?.Page?.media);
    setLastPage(result?.data?.Page?.pageInfo?.lastPage);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const paginate = (page) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setPage(page);
  };

  useEffect(() => {
    getData();
  }, [page]);

  return {
    list,
    loading,
    page,
    lastPage,
    paginate,
  };
};

export default useAnimeList;
