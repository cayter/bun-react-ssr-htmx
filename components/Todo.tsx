import type { Todo } from "pages";
import React from "react";

export default function Todo(data: Todo) {
    return (
        <pre>
          {JSON.stringify(data, null, '  ')}
        </pre>
    )
}