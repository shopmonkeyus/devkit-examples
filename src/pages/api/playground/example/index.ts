import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<
    {
      route: string;
      name: string;
      description: string;
      tags?: string[];
      id: string;
    }[]
  >
) {
  res.status(200).json([
    {
      id: "all",
      route: "/api/playground/example/all",
      name: "All Components",
      description:
        "Preview all available components to customize your mini app",
    },
    {
      id: "accordion",
      route: "/api/playground/example/accordion",
      name: "Accordion",
      description: "Use a basic template with a text input and a button",
    },
    {
      id: "loading",
      route: "/api/playground/example/accordion?mod=loading",
      name: "Loading (<3 sec)",
      tags: ["Un-customizable"],
      description: "Un-customizable loading state (if less than 3 seconds)",
    },
    {
      id: "loading-long",
      route: "/api/playground/example/accordion?mod=loading-long",
      name: "Loading (3-10 sec)",
      tags: ["Un-customizable"],
      description: "Loading state (up to 10 seconds)",
    },
    {
      id: "error",
      route: "/api/playground/example/accordion?mod=error",
      name: "Expected Error",
      description:
        "In the event your mini app content you can display an error state",
    },
    {
      id: "fatal-error",
      route: "/api/playground/example/accordion?mod=fatal-error",
      name: "Fatal Error",
      tags: ["Un-customizable"],
      description:
        "In the event your mini app content cannot be displayed, this will be shown",
    },
  ]);
}
