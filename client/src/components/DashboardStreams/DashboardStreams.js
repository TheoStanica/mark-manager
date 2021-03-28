import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TwitterHomeTimeline from '../TwitterHomeTimeline';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { reorderStreams } from '../../redux/actions/twitterActions';
import TwitterSearchStream from '../TwitterSearchStream';
import {
  StyledDashboardStreams,
  StyledStreamsWrapper,
  StyledStreamContainer,
  StyledStreamsList,
} from './styles';

const DashboardStreams = () => {
  const { streams } = useSelector((state) => state.twitterReducer);
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = [...streams];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(reorderStreams({ streams: items }));
  }

  const renderStream = (stream, provided) => {
    switch (stream.type) {
      case 'home_timeline':
        return <TwitterHomeTimeline stream={stream} provided={provided} />;
      case 'search':
        return <TwitterSearchStream stream={stream} provided={provided} />;
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
                      key={stream.id}
                      draggableId={String(stream.id)}
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
