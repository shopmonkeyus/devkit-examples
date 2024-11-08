import type { NextApiRequest, NextApiResponse } from "next";
require("dotenv").config();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "pong" });
}
