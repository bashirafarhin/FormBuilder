import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "react-beautiful-dnd";
import type { FormFieldType } from "../../lib/types/form";

interface Props {
  fields: FormFieldType[];
  onReorder: (newFields: FormFieldType[]) => void;
  renderField: (field: FormFieldType) => React.ReactNode;
}

const DraggableFieldsList: React.FC<Props> = ({
  fields,
  onReorder,
  renderField,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedFields = Array.from(fields);
    const [movedItem] = updatedFields.splice(result.source.index, 1);
    updatedFields.splice(result.destination.index, 0, movedItem);

    onReorder(updatedFields);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="fields">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {renderField(field)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableFieldsList;
