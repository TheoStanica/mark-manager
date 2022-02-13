import React from 'react';
import { Box } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../api/user/api';
import Stream from './Stream/Stream';

const Streams = () => {
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();

  async function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = [...data.user.stream_preferences];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    await update({ streams: items });
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
