// Task.js

import { useDrag, useDrop } from "react-dnd";
import { useCallback } from "react";

const Task = ({ title, id, onDrop, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: id, status: status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const mergedRefs = useCallback(
    (node) => {
      drag(node);
      drop(node);
    },
    [drag, drop]
  );

  return (
    <div
      ref={mergedRefs}
      className={`p-4 mt-5 max-w-md mx-auto bg-slate-200 rounded-xl shadow-md hover:cursor-grab ${
        isOver ? "bg-yellow-200" : ""
      }`}
    >
      <h1
        className={`text-xl text-center font-bold text-gray-800 ${
          isDragging ? "opacity-25" : "opacity-100"
        }`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Task;
