import { CircularProgress } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import {
  IFacebookStreamData,
  IStreamPreference,
} from '../../../../../../api/user/types';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../../../core/redux/store';
import {
  IFacebookPageFeedReqestExtended,
  IFacebookPageFeedResponsePayload,
} from '../../../../../../api/facebook/types';
import { useFetchPostsQuery } from '../../../../../../api/facebook';
import FacebookCard from '../SocialCards/FacebookCard';

interface Props {
  stream: IStreamPreference<IFacebookStreamData>;
}

const FacebookPageFeedStream = ({ stream }: Props) => {
  const after = useSelector((state: AppState) => {
    const data = state.facebookApi.queries[stream.id]?.data as
      | IFacebookPageFeedResponsePayload
      | undefined;
    if (!data) {
      return undefined;
    }
    return data.paging?.cursors.after;
  });

  const searchParams: IFacebookPageFeedReqestExtended = useMemo(() => {
    return {
      id: stream.id,
      facebookUserId: stream.data.facebookUserId,
      pageId: stream.data.pageId,
      after,
    };
  }, [stream, after]);
  const { data, isFetching, isLoading, refetch } = useFetchPostsQuery(
    searchParams,
    {
      skip: false,
    }
  );

  const onLoadMore = useCallback(() => {
    if (isFetching || isLoading) {
      return;
    }
    refetch();
  }, [isFetching, isLoading, refetch]);

  return (
    <InfiniteScroll
      loadMore={onLoadMore}
      hasMore={!!after}
      useWindow={false}
      threshold={500}
      loader={
        <div key={uuid()} style={loadinStyle}>
          <CircularProgress size={30} />
        </div>
      }
    >
      <>
        {data?.data.map((post, id) => (
          <FacebookCard key={post.id} data={post} stream={stream} />
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

export default FacebookPageFeedStream;
