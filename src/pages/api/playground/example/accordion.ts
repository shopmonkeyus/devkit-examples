import { EnterCouponComponents } from "@/components/coupon";
import { sleep } from "@/util/sleep";
import type { NextApiRequest, NextApiResponse } from "next";

const CouponContainer = (error?: string) => ({
  success: true,
  type: "start",
  containers: [
    {
      config: {
        className: "border-none rounded-lg",
        bgColor: "gray",
        icon: "doc-dollar",
        title: "Coupons & Bundles",
        variant: "large",
        open: true,
      },
      id: "9d05a6bc-f5de-455c-a53f-7624e00d85b8",
      placement: "after",
      target: "playground",
      type: "accordion",
      state: undefined,
      components: EnterCouponComponents(error),
    },
  ],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.query.mod) {
    case "loading":
      await sleep(2000);
    case "loading-long":
      await sleep(5000);
    case "error":
      res.status(200).json(CouponContainer("This text value is invalid"));
      break;
    case "fatal-error":
      throw new Error("Fatal error");
    default:
      res.status(200).json(CouponContainer());
      break;
  }
}
