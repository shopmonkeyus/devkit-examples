// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Request, Response } from "../../types";

const initialCouponContent = [
  {
    type: "flexbox",
    className: "flex flex-col gap-4",
    content: [
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
  const { action } = req.body as Request;
  console.log(req.body);
  switch (action) {
    case "start": {
      /// TODO: hit order PUT metdata  "mlc.coupon_applied"
      res.status(200).json({
        success: true,
        widgets: [
          {
            config: {
              bgColor: "white",
              title: "Coupons & Bundles",
              variant: "large",
            },
            id: "df8a95cd-dd48-48cb-85f3-4faebd8bfaee",
            placement: "before",
            target: "expresslane.sidebar.vehicle",
            type: "accordion",
            initialContent: initialCouponContent,
          },
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
            initialContent: initialCouponContent,
          },
        ],
      });
      return;
    }
    case "remove-coupon": {
      await sleep(1_000);
      break;
    }
    case "apply-coupon": {
      const code = req.body?.values["coupon_code"];
      await sleep(1_000);
      switch (code) {
        case "modal": {
          res.status(200).json({
            success: true,
            content: [
              {
                type: "modal",
                variant: "medium",
                closeAction: "modal.close",
                header: {
                  title: "title",
                },
                footer: {
                  content: [
                    {
                      type: "button",
                      content: "Cancel",
                      action: "modal.cancel",
                      variant: "secondary",
                    },
                    {
                      type: "button",
                      content: "Yes",
                      action: "modal.yes",
                    },
                  ],
                },
                content: [
                  {
                    type: "typography",
                    content: "Hello modal",
                    level: 3,
                    variant: "body",
                    className: "text-gray-600 mt-2",
                  },
                ],
              },
            ],
          });
          return;
        }
        case "alert": {
          res.status(200).json({
            success: true,
            content: [
              {
                action: "apply.coupon",
                closeAction: "default",
                messageVariant: "confirmation",
                type: "alert",
                content: "Are you sure you're using the right code?",
                title: "Alert",
                icon: "engine-scanner",
                button: "I think so",
                close: "Nope",
              },
            ],
          });
          return;
        }
      }
      if (code === "123") {
        res.status(200).json({
          success: true,
          state: code,
          content: [
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
        });
        return;
      }
    }
    default: {
      break;
    }
  }
  res.status(200).json({
    success: true,
    state: "this is state",
    content: [
      {
        type: "flexbox",
        className: "flex flex-col gap-4",
        content: [
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
            placeholder: "type a novela",
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
  });
}
