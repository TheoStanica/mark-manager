import React, { useRef, useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
  useCurrentUserQuery,
  useUpdateStreamPreferencesMutation,
} from '../../../../api/user/api';
import Stream from './Stream/Stream';
import useCustomScrollTrigger from '../../../../core/hooks/useCustomScrollTrigger';
import useIsMobileScreen from '../../../../core/hooks/useIsMobileScreen';

const Streams = () => {
  const { data } = useCurrentUserQuery();
  const [update] = useUpdateStreamPreferencesMutation();
  const [isDragging, setIsDragging] = useState(false);
  const trigger = useCustomScrollTrigger();
  const isMobile = useIsMobileScreen();

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
            sx={container(trigger, isMobile)}
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

const container = (trigger, isMobile) => ({
  display: 'inline-flex',
  flex: 1,
  overflow: 'auto',
  scrollSnapType: 'x mandatory',
  scrollPaddingLeft: isMobile ? 0 : 8,
  height: '100%',
  maxHeight: getMinHeight(trigger, isMobile),
  gap: isMobile ? 0 : 1,
  p: isMobile ? 0 : 1,
});

const getMinHeight = (trigger, isMobile) => {
  let occupiedSpace = 0;
  occupiedSpace += isMobile ? 56 : 80;
  if (trigger && isMobile) {
    occupiedSpace = 0;
  }
  return `calc(100vh - ${occupiedSpace}px)`;
};

export default Streams;
