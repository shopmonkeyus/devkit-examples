import { NextApiRequest, NextApiResponse } from "next";

const defaultConfig = {
  bgColor: "white",
  title: "👋🌍 Hello World 🌍👋",
};

const expressConfig = {
  className: "border-none rounded-lg bg-gray-100",
  title: "👋🌍 Hello World 🌍👋",
  variant: "large",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = req.query.express ? expressConfig : defaultConfig;

  res.status(200).json({
    success: true,
    container: {
      config,
      id: "hello-world",
      state: undefined,
      components: [
        {
          type: "link",
          href: "https://www.example.com",
          content: "Example Link",
        },
      ],
    },
  });
}
