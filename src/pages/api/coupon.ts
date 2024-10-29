// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "../../types";
import { readDatabase, writeDatabase } from "@/util/db";
import { Configuration, OrderApi } from "@shopmonkeyus/sdk";

const config = new Configuration({
  basePath: process.env.SM_API_URL,
  accessToken: process.env.SM_ACCESS_TOKEN,
});

const initialRemoveCouponContent = [
  {
    type: "div",
    className: "flex flex-col gap-4",
    components: [
      {
        type: "keyvaluepair",
        label: "Coupon applied",
        icon: "check-in-circle",
        action: "remove-coupon",
        actionType: "remove",
      },
      {
        type: "typography",
        content:
          "Free Goodyear Assurance WeatherReady wiper blades with any oil change.",
        level: 5,
        variant: "body",
        className: "text-gray-600 mt-2",
      },
    ],
  },
];

const initialEnterCouponContentWithServiceNotFound = [
  {
    type: "div",
    className: "flex flex-col gap-4",
    components: [
      {
        type: "field",
        id: "coupon_code",
        error: "No valid service found for this coupon",
        autoFocus: true,
        name: "something",
        caption: "Enter the card number to apply member discount to this order",
        placeholder: "Enter a code ...",
      },
      {
        type: "button",
        content: "Apply",
        variant: "secondary",
        className: "w-full",
        enabledBy: "coupon_code",
        action: "apply-coupon",
      },
    ],
  },
];

const initialEnterCouponContentWithError = [
  {
    type: "div",
    className: "flex flex-col gap-4",
    components: [
      {
        type: "field",
        id: "coupon_code",
        error: "Invalid coupon code",
        autoFocus: true,
        caption: "Enter the card number to apply member discount to this order",
        placeholder: "Enter a code ...",
      },
      {
        type: "button",
        content: "Apply",
        variant: "secondary",
        className: "w-full",
        enabledBy: "coupon_code",
        action: "apply-coupon",
      },
    ],
  },
];

const initialEnterCouponContent = [
  {
    type: "div",
    className: "flex flex-col gap-4",
    components: [
      {
        type: "field",
        id: "coupon_code",
        autoFocus: true,
        caption: "Enter the card number to apply member discount to this order",
        placeholder: "Enter a code ...",
      },
      {
        type: "button",
        content: "Apply",
        variant: "secondary",
        className: "w-full",
        enabledBy: "coupon_code",
        action: "apply-coupon",
      },
    ],
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== "POST") {
    res.status(200).json({
      success: true,
      type: "action",
    });
    return;
  }
  const orderApi = new OrderApi(config);
  const { action, context } = req.body as Request;
  const url = new URL(context?.url);

  const orderId = url.pathname.split("/").pop() ?? "";

  switch (action) {
    case "start": {
      try {
        await orderApi.v3OrderIdGet({
          id: orderId ?? "",
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: "Failed to fetch order",
          type: "action",
        });
        return;
      }

      const hasCoupon = readDatabase(orderId, "coupons-order")?.couponApplied;
      res.status(200).json({
        success: true,
        type: "start",
        containers: [
          {
            config: {
              bgColor: "white",
              icon: "doc-dollar",
              title: "Coupons & Bundles",
            },
            id: "9d05a6bc-f5de-455c-a53f-7624e00d85b8",
            placement: "after",
            target: "order.sidebar.payments",
            type: "accordion",
            state: hasCoupon ? { code: hasCoupon } : undefined,
            components: hasCoupon
              ? initialRemoveCouponContent
              : initialEnterCouponContent,
          },
        ],
      });
      return;
    }
    case "remove-coupon": {
      const couponCode = req.body.state.code;
      const coupon = readDatabase(couponCode, "coupons");

      try {
        const service = await orderApi.v3OrderOrderIdServiceGet({
          orderId: orderId ?? "",
        });
        const serviceId = service.data?.find(
          (s) => s.sourceServiceId === coupon.cannedServiceId
        )?.id;

        await orderApi.v3OrderOrderIdServiceIdPut({
          orderId: orderId ?? "",
          id: serviceId ?? "",
          v3OrderOrderIdServiceIdPutRequest: {
            discountPercent: 0,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(404).json({
          success: false,
          message: "Failed to fetch order",
          type: "action",
        });
        return;
      }
      writeDatabase(orderId, "coupons-order", { couponApplied: undefined });

      await sleep(1_000);
      res.status(200).json({
        success: true,
        state: undefined,
        type: "action",

        components: initialEnterCouponContent,
      });
      return;
    }
    case "apply-coupon": {
      const code = req.body?.values["coupon_code"];
      const coupon = readDatabase(code, "coupons");
      if (!coupon) {
        res.status(200).json({
          success: true,
          state: undefined,
          type: "action",
          components: initialEnterCouponContentWithError,
        });
        return;
      }

      try {
        const service = await orderApi.v3OrderOrderIdServiceGet({
          orderId: orderId ?? "",
        });
        const serviceId = service.data?.find(
          (s) => s.sourceServiceId === coupon.cannedServiceId
        )?.id;
        if (!serviceId) {
          res.status(200).json({
            success: true,
            state: undefined,
            type: "action",
            components: initialEnterCouponContentWithServiceNotFound,
          });
          return;
        }

        await orderApi.v3OrderOrderIdServiceIdPut({
          orderId: orderId ?? "",
          id: serviceId ?? "",
          v3OrderOrderIdServiceIdPutRequest: {
            discountPercent: coupon.percent,
          },
        });
      } catch (error) {
        res.status(404).json({
          success: false,
          message: "Failed to fetch order",
          type: "action",
        });
        return;
      }
      await sleep(1_000);

      writeDatabase(orderId, "coupons-order", { couponApplied: code });
      res.status(200).json({
        success: true,
        state: { code },
        type: "action",
        components: initialRemoveCouponContent,
      });
      return;
    }
    default: {
      break;
    }
  }
}
