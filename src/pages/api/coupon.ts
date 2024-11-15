// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "../../types";
import { readDatabase, writeDatabase } from "@/util/db";
import { Configuration, OrderApi } from "@shopmonkeyus/sdk";
import {
  EnterCouponComponents,
  RemoveCouponComponents,
} from "@/components/coupon";
import { sleep } from "@/util/sleep";
import crypto from "crypto";

export const createSignatureAndThrowIfInvalid = (
  req: NextApiRequest,
  secret?: string
) => {
  if (!secret) {
    throw new Error("No secret provided");
  }

  const msgId = req.headers["x-devkit-id"];
  const timestamp = req.headers["x-devkit-timestamp"];
  const signature = req.headers["x-devkit-signature"];
  const payload = req.body;

  const toSign = `${msgId}.${timestamp}.${JSON.stringify(payload)}`;
  const reconstructedSignature = crypto
    .createHmac("sha256", secret)
    .update(toSign)
    .digest("hex");

  if (signature?.includes(reconstructedSignature) === false) {
    throw new Error("Invalid signature");
  }
};

const config = new Configuration({
  basePath: process.env.SM_API_URL,
  accessToken: process.env.SM_ACCESS_TOKEN,
});

const defaultConfig = {
  bgColor: "white",
  icon: "doc-dollar",
  title: "Coupons & Bundles",
  open: true,
};

const expressConfig = {
  className: "border-none rounded-lg bg-gray-100",
  icon: "doc-dollar",
  title: "Coupons & Bundles",
  variant: "large",
  open: true,
};

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

  createSignatureAndThrowIfInvalid(req, process.env.SM_SECRET ?? "");

  const configUI = req.query.express ? expressConfig : defaultConfig;
  const orderApi = new OrderApi(config);
  const { action, context } = req.body as Request;
  const orderId =
    typeof context.orderId === "string" ? context.orderId : undefined;

  if (!process.env.SM_API_URL || !process.env.SM_ACCESS_TOKEN) {
    throw new Error("Missing environment variables");
  }

  if (!orderId) {
    res.status(404).json({
      success: false,
      message: "No order ID found",
      type: "action",
    });
    return;
  }

  await sleep(1000);

  if (req.query.error) {
    res.status(500).json({
      success: false,
      message: "Mock error",
      type: "action",
    });
  }

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
        container: {
          config: configUI,
          id: "9d05a6bc-f5de-455c-a53f-7624e00d85b8",
          state: hasCoupon ? { code: hasCoupon } : undefined,
          components: hasCoupon
            ? RemoveCouponComponents
            : EnterCouponComponents(),
        },
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
          refresh: true,
        });
        return;
      }
      writeDatabase(orderId, "coupons-order", { couponApplied: undefined });
      res.status(200).json({
        success: true,
        state: undefined,
        type: "action",
        refresh: true,
        components: EnterCouponComponents(),
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
          components: EnterCouponComponents("Invalid coupon code"),
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
            refresh: true,
            components: EnterCouponComponents(
              "No valid service found for this coupon"
            ),
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

      writeDatabase(orderId, "coupons-order", { couponApplied: code });
      res.status(200).json({
        success: true,
        state: { code },
        type: "action",
        refresh: true,
        components: RemoveCouponComponents,
      });
      return;
    }
    default: {
      break;
    }
  }
}
