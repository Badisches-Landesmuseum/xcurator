import { config, ResponsiveSpace } from './stitches.config';
export declare function spaceToNegativeSpace(space: ResponsiveSpace): {} | undefined;
export declare function sliceSpace(space?: ResponsiveSpace, maxBreakpoint?: keyof (typeof config)['media']): {} | undefined;
