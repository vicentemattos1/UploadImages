import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}
interface GetImagesResponse {
  data: Image[];
  after: string;
}

export default function Home(): JSX.Element {
  async function fetchProjects({
    pageParam = null,
  }): Promise<GetImagesResponse> {
    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchProjects, {
    getNextPageParam: lastPage => lastPage?.after || null,
    refetchInterval: 1000 * 10000000,
    staleTime: 1000 * 10000000,
    refetchOnWindowFocus: false,
  });

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(igmData => igmData.data.flat());

    return formatted;
  }, [data]);

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        <Box marginTop="20px">
          {hasNextPage &&
            (isFetchingNextPage ? (
              <Button disabled>Carrengando</Button>
            ) : (
              <Button>Carregar mais</Button>
            ))}
        </Box>
      </Box>
    </>
  );
}
