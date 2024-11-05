export interface Request {
  action: string;
  state?: any;
  context: {
    pathname: string;
    url: string;
    containerId: string;
    userId: string;
    [key: string]: unknown;
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
  placement: "before" | "after";
  target: string;
  state?: any;
  type: string;
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
