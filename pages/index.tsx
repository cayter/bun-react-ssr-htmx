import * as React from "react";
import TodoC from "../components/Todo";

export interface Todo {
  "userId": number;
  "id": number;
  "title": string;
  "completed": boolean;
}

export async function loader(req: Request) {
  const url = new URL(req.url);
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${url.searchParams.get("id") || 1}`);

	return await response.json() as Todo;
}

export function Component(data: Awaited<ReturnType<typeof loader>>) {
  return (
		<html lang="en">
      <head>
        <title>Bun + React SSR + HTMX</title>
        <script src="https://unpkg.com/htmx.org@1.9.2"></script>
      </head>

			<body>
        <div id="data">
          <TodoC {...data} />

          <button 
            hx-get={`?id=${data.id + 1}`}
            hx-target="#data"
            hx-swap="innerHTML"
            hx-trigger="click">
              Next
          </button>
        </div>
			</body>
		</html>
	);
}