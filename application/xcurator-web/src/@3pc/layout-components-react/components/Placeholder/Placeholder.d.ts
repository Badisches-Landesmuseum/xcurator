import type * as Stitches from '@stitches/react';
import { config } from '../../stitches.config';
declare const Placeholder: {
    ({ width, height, label, }: PlaceholderProps): JSX.Element;
    displayName: string;
};
export declare type PlaceholderProps = {
    width?: Stitches.PropertyValue<'width', typeof config>;
    height?: Stitches.PropertyValue<'height', typeof config>;
    label?: string;
};
export { Placeholder };
