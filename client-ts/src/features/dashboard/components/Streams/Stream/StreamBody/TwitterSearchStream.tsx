import { CircularProgress } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useFetchTweetsQuery } from '../../../../../../api/twitter';
import {
  ISearchTweetsQueryRequest,
  ISearchTweetsResponseExtended,
} from '../../../../../../api/twitter/types';
import {
  IStreamPreference,
  ITwitterStreamData,
} from '../../../../../../api/user/types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../core/redux/store';
import TwitterCard from '../SocialCards/TwitterCard';

interface Props {
  stream: IStreamPreference<ITwitterStreamData>;
}

const TwitterSearchStream = ({ stream }: Props) => {
  const maxId = useSelector((state: AppState) => {
    const data = state.twitterApi.queries[stream.id]?.data as
      | ISearchTweetsResponseExtended
      | undefined;
    if (!data) {
      return undefined;
    }
    return data.metadata.maxId;
  });

  const searchParams: ISearchTweetsQueryRequest = useMemo(() => {
    return {
      id: stream.id,
      tweet: {
        search: stream.data.search!,
        twitterUserId: stream.data.twitterUserId,
        maxId: maxId,
      },
    };
  }, [stream, maxId]);
  const { data, isFetching, refetch } = useFetchTweetsQuery(searchParams, {
    skip: false,
  });

  const onLoadMore = useCallback(() => {
    if (isFetching) {
      return;
    }
    refetch();
  }, [isFetching, refetch]);

  return (
    <InfiniteScroll
      loadMore={onLoadMore}
      hasMore={true}
      useWindow={false}
      threshold={500}
      loader={
        <div key={uuid()} style={loadinStyle}>
          <CircularProgress size={30} />
        </div>
      }
    >
      <>
        {data?.statuses.map((tweet) => (
          <TwitterCard key={tweet.id} data={tweet} />
        ))}
      </>
    </InfiniteScroll>
  );
};

const loadinStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
  marginBottom: '1rem',
};

export default TwitterSearchStream;
