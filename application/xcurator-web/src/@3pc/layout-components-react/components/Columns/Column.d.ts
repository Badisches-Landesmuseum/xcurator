import React, { ComponentPropsWithRef, ReactNode } from 'react';
declare const Column: React.ForwardRefExoticComponent<Pick<ColumnProps, "width" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & React.RefAttributes<HTMLDivElement>>;
export declare type ColumnProps = ComponentPropsWithRef<'div'> & {
    children?: ReactNode;
    width?: 'content' | number;
};
export { Column };
