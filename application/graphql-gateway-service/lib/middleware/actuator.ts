import actuator from '3pc-express-actuator';
import { name, version } from '../../package.json';

console.log('🤖 Starting Express Actuator');
export const actuatorRoutes = actuator({
  path: '/_status',
  build: {
    name,
    version,
    description: 'A GraphQL Gateway',
  },
  health: {
    enabled: true,
    path: '/healthz',
  },
  info: {
    enabled: true,
    path: '/ready',
  },
  metrics: {
    enabled: true,
    path: '/metrics',
  },
});
