import React, { ComponentPropsWithRef, ReactNode } from 'react';
declare const Ratio: React.ForwardRefExoticComponent<Pick<RatioProps, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "ratio"> & React.RefAttributes<HTMLDivElement>>;
export declare type RatioProps = ComponentPropsWithRef<'div'> & {
    children?: ReactNode;
    ratio?: number;
};
export { Ratio };
