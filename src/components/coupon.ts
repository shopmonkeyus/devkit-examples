export const EnterCouponComponents = (error?: string) => {
  return [
    {
      type: "div",
      className: "flex flex-col gap-4",
      components: [
        {
          type: "field",
          id: "coupon_code",
          autoFocus: true,
          error,
          caption:
            "Enter the card number to apply member discount to this order",
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
};

export const RemoveCouponComponents = [
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
