import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../api/user/api';
import Stream from './Stream/Stream';

const Streams = () => {
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();
  const [isDragging, setIsDragging] = useState(false);
  const theme = useTheme();
  const isLowerSizeScreen = useMediaQuery(theme.breakpoints.down('sm'));

  async function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = [...data.user.stream_preferences];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setIsDragging(false);
    await update({ streams: items });
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="streams" direction="horizontal">
        {(provided) => (
          <Box
            sx={container(isLowerSizeScreen)}
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
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    sx={{
                      scrollSnapAlign: isDragging ? 'none' : 'start',
                    }}
                    {...provided.draggableProps}
                  >
                    <Stream
                      key={stream.id}
                      stream={stream}
                      provided={provided}
                      snapshot={snapshot}
                      onDragging={() => setIsDragging(true)}
                    />
                  </Box>
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

const container = (isLowerSizeScreen) => ({
  scrollSnapType: 'x mandatory',
  display: 'inline-flex',
  flex: 1,
  overflow: 'auto',
  height: '100%',
  gap: isLowerSizeScreen ? 0 : 1,
  p: isLowerSizeScreen ? 0 : 1,
});

export default Streams;
