import { Box } from '@mui/material';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useCurrentUserQuery } from '../../../../api/user/api';
import Stream from './Stream/Stream';

const Streams = () => {
  const { data } = useCurrentUserQuery();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="streams" direction="horizontal">
        {(provided) => (
          <Box
            sx={container}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data?.user?.stream_preferences.map((stream, index) => (
              <Draggable
                disableInteractiveElementBlocking="true"
                key={stream.id}
                draggableId={stream.id}
                index={index}
              >
                {(provided) => (
                  <div
                    style={{ height: '100%' }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <Stream
                      key={stream.id}
                      stream={stream}
                      provided={provided}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const container = {
  display: 'inline-flex',
  gap: 1,
  height: '100%',
  p: 1,
};

export default Streams;
