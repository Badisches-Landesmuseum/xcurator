import React, { ReactNode, ComponentPropsWithRef } from 'react';
import type { ResponsiveSpace } from '../../stitches.config';
declare const Bleed: React.ForwardRefExoticComponent<Pick<BleedProps, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "space" | "bottom" | "left" | "right" | "top" | "horizontal" | "vertical" | "as"> & React.RefAttributes<HTMLDivElement>>;
export declare type BleedProps = ComponentPropsWithRef<'div'> & {
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
