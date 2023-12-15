import React, { ReactNode } from 'react';
import type { ResponsiveSpace } from '../../stitches.config';
declare const Bleed: React.ForwardRefExoticComponent<BleedProps & React.RefAttributes<HTMLDivElement>>;
export declare type BleedProps = {
    as?: 'div' | 'span';
    children?: ReactNode;
    space?: ResponsiveSpace;
    horizontal?: ResponsiveSpace;
    vertical?: ResponsiveSpace;
    top?: ResponsiveSpace;
    bottom?: ResponsiveSpace;
    left?: ResponsiveSpace;
    right?: ResponsiveSpace;
};
export { Bleed };
