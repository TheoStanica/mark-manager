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
  const { streams } = useSelector((state) => state.twitterReducer);
  const streamsById = useSelector((state) => state.twitterReducer.streamsById);
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = [...streams];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderStreams({ streams: items }));
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
                {streams.map((stream, index) => {
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
