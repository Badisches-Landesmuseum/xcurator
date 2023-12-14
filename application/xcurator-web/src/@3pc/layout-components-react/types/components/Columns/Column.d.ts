import React, { ReactNode } from 'react';
export declare type ColumnProps = {
    children?: ReactNode;
    width?: 'content' | number;
};
declare const Column: React.ForwardRefExoticComponent<ColumnProps & React.RefAttributes<HTMLDivElement>>;
export { Column };
