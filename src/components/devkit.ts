const CheckboxComponent = {
  type: "checkbox",
  content: "Check me",
  id: "checkbox",
  tooltip: "This is a tooltip",
};

const FieldComponent = {
  type: "field",
  id: "field",
  caption: "caption",
  label: "label",
  error: "this is an error",
  placeholder: "placeholder",
};

const StepperComponent = {
  type: "stepper",
  id: "stepper-value",
};

const SwitchComponent = {
  type: "switch",
  id: "switch-value",
  content: "hi",
};

const RangeComponent = {
  type: "range",
  id: "range-value",
  min: 0,
  max: 10,
  initialValue: 10,
};

const SelectComponent = {
  type: "select",
  id: "select-value",
  initialValue: "1",
  options: [
    { value: "1", label: "One", sublabel: "this is one" },
    { value: "2", label: "Two", sublabel: "this is two" },
    { value: "3", label: "Three", sublabel: "this is three" },
  ],
};

const DatetimeComponent = {
  type: "datetimepicker",
  id: "datetime-value",
};

const TextareaComponent = {
  type: "textarea",
  id: "textarea-value",
  placeholder: "type a novel",
};

const UserSelectComponent = {
  type: "userselect",
  id: "userselect-value",
  label: "Select a technician",
  icon: "technician",
};

const LinkComponent = {
  type: "link",
  href: "https://www.google.com",
  content: "Google",
};

const ButtonComponent = {
  type: "button",
  content: "Apply",
  variant: "secondary",
  className: "w-full",
  enabledBy: "coupon_code",
  action: "apply-coupon",
};

const DivComponents = [
  {
    type: "div",
    className: "flex flex-col gap-4",
    components: [
      CheckboxComponent,
      FieldComponent,
      StepperComponent,
      SwitchComponent,
      RangeComponent,
      SelectComponent,
      DatetimeComponent,
      TextareaComponent,
      UserSelectComponent,
      LinkComponent,
      ButtonComponent,
    ],
  },
];
