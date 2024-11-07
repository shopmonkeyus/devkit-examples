export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];

export interface Request {
  action: string;
  state?: any;
  context: {
    pathname: string;
    url: string;
    containerId: string;
    userId: string;
    [key: string]: JsonValue;
  };
  values?: Record<string, unknown>;
  metadata?: Record<string, Record<string, unknown>>;
}

export interface Component {
  type: string;
  [key: string]: unknown;
}

export interface DevkitContainerConfig {
  config: Record<string, string | boolean | number>;
  id: string;
  state?: any;
  components: Component[];
}

export interface StartResponse {
  message?: string;
  success: boolean;
  container: DevkitContainerConfig;
  type: "start";
}

export interface ActionResponse {
  components?: Component[];
  message?: string;
  state?: any;
  success: boolean;
  refresh?: boolean;
  type: "action";
}

export type Response = StartResponse | ActionResponse;
