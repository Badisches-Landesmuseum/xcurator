declare module '3pc-express-actuator' {
  type ActuatorOptions = {
    path: string;
    build: {
      name: string;
      version: string;
      description: string;
    };
    health: {
      enabled: boolean;
      path: string;
    };
    info: {
      enabled: boolean;
      path: string;
    };
    metrics: {
      enabled: boolean;
      path: string;
    };
  };

  export default function actuator(options: ActuatorOptions): any;
}
