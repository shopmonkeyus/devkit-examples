import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      route: string;
      name: string;
      description: string;
      id: string;
    }[]
  >
) {
  res.status(200).json([
    {
      id: "accordion",
      route: "/api/playground/example/accordion",
      name: "Accordion",
      description: "A simple accordion container",
    },
    {
      id: "loading",
      route: "/api/playground/example/accordion?mod=loading",
      name: "Loading",
      description: "A loading state between 1 - 3 seconds",
    },
    {
      id: "loading-long",
      route: "/api/playground/example/accordion?mod=loading-long",
      name: "Loading Long",
      description: "A loading state between 3 - 10 seconds",
    },
    {
      id: "error",
      route: "/api/playground/example/accordion?mod=error",
      name: "Expected Error",
      description:
        "An expected error state that does not break the integration",
    },
    {
      id: "fatal-error",
      route: "/api/playground/example/accordion?mod=fatal-error",
      name: "Fatal Error",
      description: "An unexpected error state that breaks the integration ",
    },
  ]);
}
