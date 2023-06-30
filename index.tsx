import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const router = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: "pages",
});

Bun.serve({
    port: 3000,
    async fetch(req) {
        const route = router.match(req.url);

        if (route) {
            const { loader, Component } = await import(route.filePath);
            if (Component) {
                let props = {};

                if (loader) {
                    props = await loader(req);
                }

                return new Response(
                    renderToStaticMarkup(<Component {...props} />),
                    {
                        status: 200,
                        headers: {
                            "Content-Type": "text/html",
                        },
                    },
                );
            }

            return new Response("Only React SSR component is supported!");
        }

        return new Response("404 not found");
    },
});
