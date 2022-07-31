import { useEffect, useState } from "react";
import { ANIME_LIST } from "../utils/queries";

const useAnimeList = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);

  const getData = async () => {
    setLoading(true);
    const result = await ANIME_LIST(page);
    setList(result?.data?.Page?.media);
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
    paginate,
  };
};

export default useAnimeList;
