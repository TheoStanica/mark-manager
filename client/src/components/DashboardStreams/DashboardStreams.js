import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { reorderStreams } from '../../redux/actions/twitterActions';
import {
  StyledDashboardStreams,
  StyledStreamsWrapper,
  StyledStreamContainer,
  StyledStreamsList,
} from './styles';
import TwitterHomeTimeline from '../TwitterHomeTimeline';
import TwitterSearchStream from '../TwitterSearchStream';

const DashboardStreams = () => {
  const { streams, streamsById, twitterFilteredAccounts } = useSelector(
    (state) => state.twitterReducer
  );
  const dispatch = useDispatch();

  // get the streams filtered based on selected accounts
  const filteredStreams = streams.filter((stream) =>
    twitterFilteredAccounts.includes(streamsById[stream].twitterUserId)
  );

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const allStreams = [...streams];
    // get the source and destination indexes(from the filtered array)
    // get those streams' ids
    const sourceStreamValue = filteredStreams[result.source.index];
    const destinationStreamValue = filteredStreams[result.destination.index];
    // get idx of those from the unfiltered array
    const allStreamsSourceIdx = allStreams.indexOf(sourceStreamValue);
    const allStreamsDestinationIdx = allStreams.indexOf(destinationStreamValue);
    // switch them in the main streams array
    const temp = allStreams[allStreamsSourceIdx];
    allStreams[allStreamsSourceIdx] = allStreams[allStreamsDestinationIdx];
    allStreams[allStreamsDestinationIdx] = temp;

    dispatch(reorderStreams({ streams: allStreams }));
  }

  const renderStream = (id, provided) => {
    switch (streamsById[id].type) {
      case 'home_timeline':
        return (
          <TwitterHomeTimeline stream={streamsById[id]} provided={provided} />
        );
      case 'search':
        return (
          <TwitterSearchStream stream={streamsById[id]} provided={provided} />
        );
      default:
        return null;
    }
  };

  return (
    <StyledDashboardStreams>
      <StyledStreamsWrapper>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={'streams'} direction="horizontal">
            {(provided) => (
              <StyledStreamsList
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredStreams?.map((stream, index) => {
                  return (
                    <Draggable
                      disableInteractiveElementBlocking="true"
                      key={stream}
                      draggableId={String(stream)}
                      index={index}
                    >
                      {(provided) => (
                        <StyledStreamContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {renderStream(stream, provided)}
                        </StyledStreamContainer>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </StyledStreamsList>
            )}
          </Droppable>
        </DragDropContext>
      </StyledStreamsWrapper>
    </StyledDashboardStreams>
  );
};

export default DashboardStreams;
