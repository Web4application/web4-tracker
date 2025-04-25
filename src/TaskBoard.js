// src/TaskBoard.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const STATUSES = ['Not Started', 'Pending', 'In Progress', 'Completed'];

export default function TaskBoard({ tasks }) {
  const onDragEnd = () => {
    // TODO: implement status update & persistence
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>     {/* DragDropContext :contentReference[oaicite:13]{index=13} */}
      <div style={{ display: 'flex', gap: 16 }}>
        {STATUSES.map(status => (
          <Droppable droppableId={status} key={status}>  {/* Droppable :contentReference[oaicite:14]{index=14} */}
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: '#f4f4f4', padding: 8, width: 250,
                  minHeight: 400, borderRadius: 4
                }}
              >
                <h3>{status}</h3>
                {tasks
                  .filter(t => t.status === status)
                  .map((task, idx) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={idx}
                    >                                            {/* Draggable :contentReference[oaicite:15]{index=15} */}
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={{
                            padding: 8, margin: '0 0 8px 0',
                            background: 'white', borderRadius: 4,
                            ...prov.draggableProps.style
                          }}
                        >
                          <strong>#{task.id}</strong> {task.name}
                          <div style={{ fontSize: 12, marginTop: 4 }}>
                            🗓 {task.start.toLocaleDateString()} – {task.end.toLocaleDateString()}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
