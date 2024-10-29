// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { action } = req.body as Request;
  switch (action) {
    case "start": {
      res.status(200).json({
        success: true,
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
            components: [
              {
                type: "div",
                className: "flex flex-col gap-4",
                components: [
                  {
                    type: "checkbox",
                    content: "Check me",
                    id: "checkbox",
                    tooltip: "This is a tooltip",
                  },
                  {
                    type: "field",
                    id: "field",
                    caption: "caption",
                    label: "label",
                    error: "this is an error",
                    placeholder: "placeholder",
                  },
                  {
                    type: "stepper",
                    id: "stepper-value",
                  },
                  {
                    type: "switch",
                    id: "switch-value",
                    content: "hi",
                  },
                  {
                    type: "range",
                    id: "range-value",
                    min: 0,
                    max: 10,
                    initialValue: 10,
                  },
                  {
                    type: "select",
                    id: "select-value",
                    initialValue: "1",
                    options: [
                      { value: "1", label: "One", sublabel: "this is one" },
                      { value: "2", label: "Two", sublabel: "this is two" },
                      { value: "3", label: "Three", sublabel: "this is three" },
                    ],
                  },
                  {
                    type: "datetimepicker",
                    id: "datetime-value",
                  },
                  {
                    type: "textarea",
                    id: "textarea-value",
                    placeholder: "type a novel",
                  },
                  {
                    type: "userselect",
                    id: "userselect-value",
                    label: "Select a technician",
                    icon: "technician",
                  },
                  {
                    type: "link",
                    href: "https://www.google.com",
                    content: "Google",
                  },
                  {
                    type: "field",
                    id: "coupon_code",
                    autoFocus: true,
                    caption:
                      "Enter the card number to apply member discount to this order",
                    label: "",
                    placeholder: "Enter a code ...",
                    error: req.body?.values?.["coupon_code"]
                      ? req.body.values["coupon_code"] !== "123"
                        ? "Invalid code"
                        : undefined
                      : undefined,
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
            ],
          },
        ],
        type: "start",
      });
      return;
    }
    default: {
      break;
    }
  }
}
