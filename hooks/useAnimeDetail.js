import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ANIME_DETAIL } from "../utils/queries";

const useAnimeDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const getData = async () => {
    setLoading(true);
    const result = await ANIME_DETAIL(id);
    setData(result?.data?.Media);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return {
    data,
    loading,
  };
};

export default useAnimeDetail;
