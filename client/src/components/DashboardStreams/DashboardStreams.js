import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TwitterHomeTimeline from '../TwitterHomeTimeline';
import './DashboardStreams.css';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { reorderStreams } from '../../redux/actions/twitterActions';
import TwitterSearchStream from '../TwitterSearchStream';

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
    <div className="dashboardStreams ">
      <div className="streamswrapper pt-05 pb-05">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={'streams'} direction="horizontal">
            {(provided) => (
              <ul
                className="streams"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ height: '100%', display: 'flex' }}
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
                        <li
                          className="ml-05 stream"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          {renderStream(stream, provided)}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DashboardStreams;
