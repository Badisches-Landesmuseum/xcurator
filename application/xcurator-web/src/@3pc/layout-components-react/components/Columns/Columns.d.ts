import React, { ComponentPropsWithRef } from 'react';
import { config } from '../../stitches.config';
import type { ResponsiveSpace } from '../../stitches.config';
import { ColumnProps } from './Column';
declare const ColumnContext: React.Context<ColumnContextValue>;
declare const Columns: React.ForwardRefExoticComponent<Pick<ColumnsProps, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "space" | "collapse" | "alignX" | "alignY"> & React.RefAttributes<HTMLDivElement>>;
export declare type ColumnsProps = ComponentPropsWithRef<'div'> & {
    children?: Array<React.ReactElement<ColumnProps> | null> | React.ReactElement<ColumnProps> | null;
    alignX?: 'left' | 'center' | 'right';
    alignY?: 'top' | 'center' | 'bottom';
    space?: ResponsiveSpace;
    collapse?: keyof (typeof config)['media'];
};
interface ColumnContextValue {
    paddingLeft?: ResponsiveSpace;
    paddingTop?: ResponsiveSpace;
}
export { Columns, ColumnContext };
