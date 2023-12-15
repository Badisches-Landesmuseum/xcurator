import { ReactNode } from 'react';
declare function Ratio({ ratio, children }: RatioProps): JSX.Element;
declare namespace Ratio {
    var displayName: string;
}
export declare type RatioProps = {
    children?: ReactNode;
    ratio?: number;
};
export { Ratio };
