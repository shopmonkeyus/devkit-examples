export interface Request {
  action: string;
  state?: any;
  context: {
    pathname: string;
    url: string;
    widgetId: string;
    userId: string;
    [key: string]: unknown;
  };
  values?: Record<string, unknown>;
  metadata?: Record<string, Record<string, unknown>>;

  // order
  // vehilce
  // customer
}

export interface Widget {
  type: string;
  [key: string]: unknown;
}

export interface DevkitWidgetConfig {
  config: Record<string, string>;
  id: string;
  placement: "before" | "after";
  target: string;
  type: string;
  initialContent: Widget[];
}

export interface StartResponse {
  message?: string;
  success: boolean;
  widgets?: DevkitWidgetConfig[];
}

export interface ActionResponse {
  content?: Widget[];
  message?: string;
  state?: unknown;
  success: boolean;
}

export type Response = StartResponse | ActionResponse;
