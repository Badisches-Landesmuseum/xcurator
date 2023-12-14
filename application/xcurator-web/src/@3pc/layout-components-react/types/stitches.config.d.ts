/// <reference types="react" />
import type * as Stitches from '@stitches/react';
import { Box } from './components';
export declare const styled: <Type extends import("@stitches/react/types/util").Function | keyof JSX.IntrinsicElements | import("react").ComponentType<any>, Composers extends (string | import("@stitches/react/types/util").Function | import("react").ComponentType<any> | {
    [name: string]: unknown;
})[], CSS_1 = import("@stitches/react/types/css-util").CSS<{
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, {
    space: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        14: string;
        16: string;
        18: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
        '-1': string;
        '-2': string;
        '-3': string;
        '-4': string;
        '-5': string;
        '-6': string;
        '-7': string;
        '-8': string;
        '-9': string;
        '-10': string;
        '-11': string;
        '-12': string;
        '-14': string;
        '-16': string;
        '-18': string;
        '-20': string;
        '-24': string;
        '-32': string;
        '-40': string;
        '-48': string;
        '-56': string;
        '-64': string;
        full: string;
    };
    radii: {
        1: string;
        2: string;
        3: string;
        4: string;
        round: string;
        pill: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {
    m: (value: Stitches.PropertyValue<'margin'>) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: Stitches.PropertyValue<'marginRight'>) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: Stitches.PropertyValue<'padding'>) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: Stitches.PropertyValue<'background'>) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: Stitches.PropertyValue<'borderRadius'>) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: Stitches.PropertyValue<'textAlign'>) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: Stitches.PropertyValue<'alignItems'>) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: Stitches.PropertyValue<'alignContent'>) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: Stitches.PropertyValue<'alignSelf'>) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: Stitches.PropertyValue<'overflowX'>) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: Stitches.PropertyValue<'overflowY'>) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: Stitches.PropertyValue<'width'>) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: Stitches.PropertyValue<'appearance'>) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
        WebkitBackgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
        backgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
    };
    lineClamp: (value: number) => {
        display: string;
        WebkitLineClamp: number;
        WebkitBoxOrient: string;
        overflow: string;
    };
    truncate: (value: boolean) => "" | {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
}>>(type: Type, ...composers: { [K in keyof Composers]: string extends Composers[K] ? Composers[K] : Composers[K] extends string | import("@stitches/react/types/util").Function | import("react").ComponentType<any> ? Composers[K] : import("@stitches/react/types/stitches").RemoveIndex<CSS_1> & {
    variants?: {
        [x: string]: {
            [x: string]: CSS_1;
            [x: number]: CSS_1;
        };
    } | undefined;
    compoundVariants?: (("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T ? { [Name in keyof T]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name]> | undefined; } : never : import("@stitches/react/types/util").WideObject) & {
        css: CSS_1;
    })[] | undefined;
    defaultVariants?: ("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T_1 ? { [Name_1 in keyof T_1]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name_1]> | undefined; } : never : import("@stitches/react/types/util").WideObject) | undefined;
} & CSS_1 & (Composers[K] extends infer T_2 ? { [K2 in keyof T_2]: K2 extends "compoundVariants" | "defaultVariants" | "variants" ? unknown : K2 extends keyof CSS_1 ? CSS_1[K2] : unknown; } : never); }) => import("@stitches/react/types/styled-component").StyledComponent<Type, import("@stitches/react/types/styled-component").StyledComponentProps<Composers>, {
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, import("@stitches/react/types/css-util").CSS<{
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, {
    space: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        14: string;
        16: string;
        18: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
        '-1': string;
        '-2': string;
        '-3': string;
        '-4': string;
        '-5': string;
        '-6': string;
        '-7': string;
        '-8': string;
        '-9': string;
        '-10': string;
        '-11': string;
        '-12': string;
        '-14': string;
        '-16': string;
        '-18': string;
        '-20': string;
        '-24': string;
        '-32': string;
        '-40': string;
        '-48': string;
        '-56': string;
        '-64': string;
        full: string;
    };
    radii: {
        1: string;
        2: string;
        3: string;
        4: string;
        round: string;
        pill: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {
    m: (value: Stitches.PropertyValue<'margin'>) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: Stitches.PropertyValue<'marginRight'>) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: Stitches.PropertyValue<'padding'>) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: Stitches.PropertyValue<'background'>) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: Stitches.PropertyValue<'borderRadius'>) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: Stitches.PropertyValue<'textAlign'>) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: Stitches.PropertyValue<'alignItems'>) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: Stitches.PropertyValue<'alignContent'>) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: Stitches.PropertyValue<'alignSelf'>) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: Stitches.PropertyValue<'overflowX'>) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: Stitches.PropertyValue<'overflowY'>) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: Stitches.PropertyValue<'width'>) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: Stitches.PropertyValue<'appearance'>) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
        WebkitBackgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
        backgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
    };
    lineClamp: (value: number) => {
        display: string;
        WebkitLineClamp: number;
        WebkitBoxOrient: string;
        overflow: string;
    };
    truncate: (value: boolean) => "" | {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
}>>, css: <Composers extends (string | import("@stitches/react/types/util").Function | import("react").JSXElementConstructor<any> | import("react").ExoticComponent<any> | {
    [name: string]: unknown;
})[], CSS_1 = import("@stitches/react/types/css-util").CSS<{
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, {
    space: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        14: string;
        16: string;
        18: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
        '-1': string;
        '-2': string;
        '-3': string;
        '-4': string;
        '-5': string;
        '-6': string;
        '-7': string;
        '-8': string;
        '-9': string;
        '-10': string;
        '-11': string;
        '-12': string;
        '-14': string;
        '-16': string;
        '-18': string;
        '-20': string;
        '-24': string;
        '-32': string;
        '-40': string;
        '-48': string;
        '-56': string;
        '-64': string;
        full: string;
    };
    radii: {
        1: string;
        2: string;
        3: string;
        4: string;
        round: string;
        pill: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {
    m: (value: Stitches.PropertyValue<'margin'>) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: Stitches.PropertyValue<'marginRight'>) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: Stitches.PropertyValue<'padding'>) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: Stitches.PropertyValue<'background'>) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: Stitches.PropertyValue<'borderRadius'>) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: Stitches.PropertyValue<'textAlign'>) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: Stitches.PropertyValue<'alignItems'>) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: Stitches.PropertyValue<'alignContent'>) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: Stitches.PropertyValue<'alignSelf'>) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: Stitches.PropertyValue<'overflowX'>) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: Stitches.PropertyValue<'overflowY'>) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: Stitches.PropertyValue<'width'>) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: Stitches.PropertyValue<'appearance'>) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
        WebkitBackgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
        backgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
    };
    lineClamp: (value: number) => {
        display: string;
        WebkitLineClamp: number;
        WebkitBoxOrient: string;
        overflow: string;
    };
    truncate: (value: boolean) => "" | {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
}>>(...composers: { [K in keyof Composers]: string extends Composers[K] ? Composers[K] : Composers[K] extends string | import("@stitches/react/types/util").Function | import("react").JSXElementConstructor<any> | import("react").ExoticComponent<any> ? Composers[K] : import("@stitches/react/types/stitches").RemoveIndex<CSS_1> & {
    variants?: {
        [x: string]: {
            [x: string]: CSS_1;
            [x: number]: CSS_1;
        };
    } | undefined;
    compoundVariants?: (("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T ? { [Name in keyof T]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name]> | undefined; } : never : import("@stitches/react/types/util").WideObject) & {
        css: CSS_1;
    })[] | undefined;
    defaultVariants?: ("variants" extends keyof Composers[K] ? Composers[K][keyof Composers[K] & "variants"] extends infer T_1 ? { [Name_1 in keyof T_1]?: import("@stitches/react/types/util").String | import("@stitches/react/types/util").Widen<keyof Composers[K][keyof Composers[K] & "variants"][Name_1]> | undefined; } : never : import("@stitches/react/types/util").WideObject) | undefined;
} & CSS_1 & (Composers[K] extends infer T_2 ? { [K2 in keyof T_2]: K2 extends "compoundVariants" | "defaultVariants" | "variants" ? unknown : K2 extends keyof CSS_1 ? CSS_1[K2] : unknown; } : never); }) => import("@stitches/react/types/styled-component").CssComponent<import("@stitches/react/types/styled-component").StyledComponentType<Composers>, import("@stitches/react/types/styled-component").StyledComponentProps<Composers>, {
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, CSS_1>, globalCss: <Styles extends {
    [K: string]: any;
}>(...styles: ({
    '@import'?: unknown;
    '@font-face'?: unknown;
} & { [K in keyof Styles]: K extends "@import" ? string | string[] : K extends "@font-face" ? import("@stitches/react/types/css").AtRule.FontFace | import("@stitches/react/types/css").AtRule.FontFace[] : K extends `@keyframes ${string}` ? {
    [x: string]: import("@stitches/react/types/css-util").CSS<{
        bp1: "(min-width: 450px)";
        bp2: "(min-width: 768px)";
        bp3: "(min-width: 1170px)";
        bp4: "(min-width: 1440px)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, {
        space: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            14: string;
            16: string;
            18: string;
            20: string;
            24: string;
            32: string;
            40: string;
            48: string;
            56: string;
            64: string;
            '-1': string;
            '-2': string;
            '-3': string;
            '-4': string;
            '-5': string;
            '-6': string;
            '-7': string;
            '-8': string;
            '-9': string;
            '-10': string;
            '-11': string;
            '-12': string;
            '-14': string;
            '-16': string;
            '-18': string;
            '-20': string;
            '-24': string;
            '-32': string;
            '-40': string;
            '-48': string;
            '-56': string;
            '-64': string;
            full: string;
        };
        radii: {
            1: string;
            2: string;
            3: string;
            4: string;
            round: string;
            pill: string;
        };
    }, import("@stitches/react/types/config").DefaultThemeMap, {
        m: (value: Stitches.PropertyValue<'margin'>) => {
            margin: {
                readonly [Stitches.$$PropertyValue]: "margin";
            };
        };
        mt: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        mr: (value: Stitches.PropertyValue<'marginRight'>) => {
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginRight";
            };
        };
        mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginBottom";
            };
        };
        ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        my: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        p: (value: Stitches.PropertyValue<'padding'>) => {
            padding: {
                readonly [Stitches.$$PropertyValue]: "padding";
            };
        };
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingRight";
            };
        };
        pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingBottom";
            };
        };
        pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        py: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        bg: (value: Stitches.PropertyValue<'background'>) => {
            background: {
                readonly [Stitches.$$PropertyValue]: "background";
            };
        };
        br: (value: Stitches.PropertyValue<'borderRadius'>) => {
            borderRadius: {
                readonly [Stitches.$$PropertyValue]: "borderRadius";
            };
        };
        ta: (value: Stitches.PropertyValue<'textAlign'>) => {
            textAlign: {
                readonly [Stitches.$$PropertyValue]: "textAlign";
            };
        };
        fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
            flexDirection: {
                readonly [Stitches.$$PropertyValue]: "flexDirection";
            };
        };
        fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
            flexWrap: {
                readonly [Stitches.$$PropertyValue]: "flexWrap";
            };
        };
        ai: (value: Stitches.PropertyValue<'alignItems'>) => {
            alignItems: {
                readonly [Stitches.$$PropertyValue]: "alignItems";
            };
        };
        ac: (value: Stitches.PropertyValue<'alignContent'>) => {
            alignContent: {
                readonly [Stitches.$$PropertyValue]: "alignContent";
            };
        };
        jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
            justifyContent: {
                readonly [Stitches.$$PropertyValue]: "justifyContent";
            };
        };
        as: (value: Stitches.PropertyValue<'alignSelf'>) => {
            alignSelf: {
                readonly [Stitches.$$PropertyValue]: "alignSelf";
            };
        };
        fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
            flexGrow: {
                readonly [Stitches.$$PropertyValue]: "flexGrow";
            };
        };
        fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
            flexShrink: {
                readonly [Stitches.$$PropertyValue]: "flexShrink";
            };
        };
        fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
            flexBasis: {
                readonly [Stitches.$$PropertyValue]: "flexBasis";
            };
        };
        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
            backgroundColor: {
                readonly [Stitches.$$PropertyValue]: "backgroundColor";
            };
        };
        btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
            borderTopRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
            };
        };
        bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
            borderBottomRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
            };
        };
        bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
            borderBottomLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
            };
        };
        btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
            borderTopLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
            };
        };
        bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
            boxShadow: {
                readonly [Stitches.$$PropertyValue]: "boxShadow";
            };
        };
        lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
            lineHeight: {
                readonly [Stitches.$$PropertyValue]: "lineHeight";
            };
        };
        ox: (value: Stitches.PropertyValue<'overflowX'>) => {
            overflowX: {
                readonly [Stitches.$$PropertyValue]: "overflowX";
            };
        };
        oy: (value: Stitches.PropertyValue<'overflowY'>) => {
            overflowY: {
                readonly [Stitches.$$PropertyValue]: "overflowY";
            };
        };
        pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
            pointerEvents: {
                readonly [Stitches.$$PropertyValue]: "pointerEvents";
            };
        };
        us: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        size: (value: Stitches.PropertyValue<'width'>) => {
            width: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
            height: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
        };
        appearance: (value: Stitches.PropertyValue<'appearance'>) => {
            WebkitAppearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
            appearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
        };
        backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
            WebkitBackgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
            backgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
        };
        lineClamp: (value: number) => {
            display: string;
            WebkitLineClamp: number;
            WebkitBoxOrient: string;
            overflow: string;
        };
        truncate: (value: boolean) => "" | {
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
    }>;
} : K extends `@property ${string}` ? import("@stitches/react/types/css").AtRule.Property : import("@stitches/react/types/css-util").CSS<{
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, {
    space: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        14: string;
        16: string;
        18: string;
        20: string;
        24: string;
        32: string;
        40: string;
        48: string;
        56: string;
        64: string;
        '-1': string;
        '-2': string;
        '-3': string;
        '-4': string;
        '-5': string;
        '-6': string;
        '-7': string;
        '-8': string;
        '-9': string;
        '-10': string;
        '-11': string;
        '-12': string;
        '-14': string;
        '-16': string;
        '-18': string;
        '-20': string;
        '-24': string;
        '-32': string;
        '-40': string;
        '-48': string;
        '-56': string;
        '-64': string;
        full: string;
    };
    radii: {
        1: string;
        2: string;
        3: string;
        4: string;
        round: string;
        pill: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {
    m: (value: Stitches.PropertyValue<'margin'>) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: Stitches.PropertyValue<'marginRight'>) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: Stitches.PropertyValue<'marginTop'>) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: Stitches.PropertyValue<'padding'>) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: Stitches.PropertyValue<'paddingTop'>) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: Stitches.PropertyValue<'background'>) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: Stitches.PropertyValue<'borderRadius'>) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: Stitches.PropertyValue<'textAlign'>) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: Stitches.PropertyValue<'alignItems'>) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: Stitches.PropertyValue<'alignContent'>) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: Stitches.PropertyValue<'alignSelf'>) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: Stitches.PropertyValue<'overflowX'>) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: Stitches.PropertyValue<'overflowY'>) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: Stitches.PropertyValue<'width'>) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: Stitches.PropertyValue<'appearance'>) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
        WebkitBackgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
        backgroundClip: {
            readonly [Stitches.$$PropertyValue]: "backgroundClip";
        };
    };
    lineClamp: (value: number) => {
        display: string;
        WebkitLineClamp: number;
        WebkitBoxOrient: string;
        overflow: string;
    };
    truncate: (value: boolean) => "" | {
        overflow: string;
        textOverflow: string;
        whiteSpace: string;
    };
}>; })[]) => () => string, keyframes: (style: {
    [offset: string]: import("@stitches/react/types/css-util").CSS<{
        bp1: "(min-width: 450px)";
        bp2: "(min-width: 768px)";
        bp3: "(min-width: 1170px)";
        bp4: "(min-width: 1440px)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, {
        space: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            14: string;
            16: string;
            18: string;
            20: string;
            24: string;
            32: string;
            40: string;
            48: string;
            56: string;
            64: string;
            '-1': string;
            '-2': string;
            '-3': string;
            '-4': string;
            '-5': string;
            '-6': string;
            '-7': string;
            '-8': string;
            '-9': string;
            '-10': string;
            '-11': string;
            '-12': string;
            '-14': string;
            '-16': string;
            '-18': string;
            '-20': string;
            '-24': string;
            '-32': string;
            '-40': string;
            '-48': string;
            '-56': string;
            '-64': string;
            full: string;
        };
        radii: {
            1: string;
            2: string;
            3: string;
            4: string;
            round: string;
            pill: string;
        };
    }, import("@stitches/react/types/config").DefaultThemeMap, {
        m: (value: Stitches.PropertyValue<'margin'>) => {
            margin: {
                readonly [Stitches.$$PropertyValue]: "margin";
            };
        };
        mt: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        mr: (value: Stitches.PropertyValue<'marginRight'>) => {
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginRight";
            };
        };
        mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginBottom";
            };
        };
        ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        my: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        p: (value: Stitches.PropertyValue<'padding'>) => {
            padding: {
                readonly [Stitches.$$PropertyValue]: "padding";
            };
        };
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingRight";
            };
        };
        pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingBottom";
            };
        };
        pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        py: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        bg: (value: Stitches.PropertyValue<'background'>) => {
            background: {
                readonly [Stitches.$$PropertyValue]: "background";
            };
        };
        br: (value: Stitches.PropertyValue<'borderRadius'>) => {
            borderRadius: {
                readonly [Stitches.$$PropertyValue]: "borderRadius";
            };
        };
        ta: (value: Stitches.PropertyValue<'textAlign'>) => {
            textAlign: {
                readonly [Stitches.$$PropertyValue]: "textAlign";
            };
        };
        fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
            flexDirection: {
                readonly [Stitches.$$PropertyValue]: "flexDirection";
            };
        };
        fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
            flexWrap: {
                readonly [Stitches.$$PropertyValue]: "flexWrap";
            };
        };
        ai: (value: Stitches.PropertyValue<'alignItems'>) => {
            alignItems: {
                readonly [Stitches.$$PropertyValue]: "alignItems";
            };
        };
        ac: (value: Stitches.PropertyValue<'alignContent'>) => {
            alignContent: {
                readonly [Stitches.$$PropertyValue]: "alignContent";
            };
        };
        jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
            justifyContent: {
                readonly [Stitches.$$PropertyValue]: "justifyContent";
            };
        };
        as: (value: Stitches.PropertyValue<'alignSelf'>) => {
            alignSelf: {
                readonly [Stitches.$$PropertyValue]: "alignSelf";
            };
        };
        fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
            flexGrow: {
                readonly [Stitches.$$PropertyValue]: "flexGrow";
            };
        };
        fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
            flexShrink: {
                readonly [Stitches.$$PropertyValue]: "flexShrink";
            };
        };
        fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
            flexBasis: {
                readonly [Stitches.$$PropertyValue]: "flexBasis";
            };
        };
        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
            backgroundColor: {
                readonly [Stitches.$$PropertyValue]: "backgroundColor";
            };
        };
        btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
            borderTopRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
            };
        };
        bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
            borderBottomRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
            };
        };
        bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
            borderBottomLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
            };
        };
        btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
            borderTopLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
            };
        };
        bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
            boxShadow: {
                readonly [Stitches.$$PropertyValue]: "boxShadow";
            };
        };
        lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
            lineHeight: {
                readonly [Stitches.$$PropertyValue]: "lineHeight";
            };
        };
        ox: (value: Stitches.PropertyValue<'overflowX'>) => {
            overflowX: {
                readonly [Stitches.$$PropertyValue]: "overflowX";
            };
        };
        oy: (value: Stitches.PropertyValue<'overflowY'>) => {
            overflowY: {
                readonly [Stitches.$$PropertyValue]: "overflowY";
            };
        };
        pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
            pointerEvents: {
                readonly [Stitches.$$PropertyValue]: "pointerEvents";
            };
        };
        us: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        size: (value: Stitches.PropertyValue<'width'>) => {
            width: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
            height: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
        };
        appearance: (value: Stitches.PropertyValue<'appearance'>) => {
            WebkitAppearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
            appearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
        };
        backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
            WebkitBackgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
            backgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
        };
        lineClamp: (value: number) => {
            display: string;
            WebkitLineClamp: number;
            WebkitBoxOrient: string;
            overflow: string;
        };
        truncate: (value: boolean) => "" | {
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
    }>;
}) => {
    (): string;
    name: string;
}, getCssText: () => string, theme: string & {
    className: string;
    selector: string;
} & {
    space: {
        0: import("@stitches/react/types/theme").Token<"0", string, "space", "">;
        1: import("@stitches/react/types/theme").Token<"1", string, "space", "">;
        2: import("@stitches/react/types/theme").Token<"2", string, "space", "">;
        3: import("@stitches/react/types/theme").Token<"3", string, "space", "">;
        4: import("@stitches/react/types/theme").Token<"4", string, "space", "">;
        5: import("@stitches/react/types/theme").Token<"5", string, "space", "">;
        6: import("@stitches/react/types/theme").Token<"6", string, "space", "">;
        7: import("@stitches/react/types/theme").Token<"7", string, "space", "">;
        8: import("@stitches/react/types/theme").Token<"8", string, "space", "">;
        9: import("@stitches/react/types/theme").Token<"9", string, "space", "">;
        10: import("@stitches/react/types/theme").Token<"10", string, "space", "">;
        11: import("@stitches/react/types/theme").Token<"11", string, "space", "">;
        12: import("@stitches/react/types/theme").Token<"12", string, "space", "">;
        14: import("@stitches/react/types/theme").Token<"14", string, "space", "">;
        16: import("@stitches/react/types/theme").Token<"16", string, "space", "">;
        18: import("@stitches/react/types/theme").Token<"18", string, "space", "">;
        20: import("@stitches/react/types/theme").Token<"20", string, "space", "">;
        24: import("@stitches/react/types/theme").Token<"24", string, "space", "">;
        32: import("@stitches/react/types/theme").Token<"32", string, "space", "">;
        40: import("@stitches/react/types/theme").Token<"40", string, "space", "">;
        48: import("@stitches/react/types/theme").Token<"48", string, "space", "">;
        56: import("@stitches/react/types/theme").Token<"56", string, "space", "">;
        64: import("@stitches/react/types/theme").Token<"64", string, "space", "">;
        [-1]: import("@stitches/react/types/theme").Token<"-1", string, "space", "">;
        [-2]: import("@stitches/react/types/theme").Token<"-2", string, "space", "">;
        [-3]: import("@stitches/react/types/theme").Token<"-3", string, "space", "">;
        [-4]: import("@stitches/react/types/theme").Token<"-4", string, "space", "">;
        [-5]: import("@stitches/react/types/theme").Token<"-5", string, "space", "">;
        [-6]: import("@stitches/react/types/theme").Token<"-6", string, "space", "">;
        [-7]: import("@stitches/react/types/theme").Token<"-7", string, "space", "">;
        [-8]: import("@stitches/react/types/theme").Token<"-8", string, "space", "">;
        [-9]: import("@stitches/react/types/theme").Token<"-9", string, "space", "">;
        [-10]: import("@stitches/react/types/theme").Token<"-10", string, "space", "">;
        [-11]: import("@stitches/react/types/theme").Token<"-11", string, "space", "">;
        [-12]: import("@stitches/react/types/theme").Token<"-12", string, "space", "">;
        [-14]: import("@stitches/react/types/theme").Token<"-14", string, "space", "">;
        [-16]: import("@stitches/react/types/theme").Token<"-16", string, "space", "">;
        [-18]: import("@stitches/react/types/theme").Token<"-18", string, "space", "">;
        [-20]: import("@stitches/react/types/theme").Token<"-20", string, "space", "">;
        [-24]: import("@stitches/react/types/theme").Token<"-24", string, "space", "">;
        [-32]: import("@stitches/react/types/theme").Token<"-32", string, "space", "">;
        [-40]: import("@stitches/react/types/theme").Token<"-40", string, "space", "">;
        [-48]: import("@stitches/react/types/theme").Token<"-48", string, "space", "">;
        [-56]: import("@stitches/react/types/theme").Token<"-56", string, "space", "">;
        [-64]: import("@stitches/react/types/theme").Token<"-64", string, "space", "">;
        full: import("@stitches/react/types/theme").Token<"full", string, "space", "">;
    };
    radii: {
        1: import("@stitches/react/types/theme").Token<"1", string, "radii", "">;
        2: import("@stitches/react/types/theme").Token<"2", string, "radii", "">;
        3: import("@stitches/react/types/theme").Token<"3", string, "radii", "">;
        4: import("@stitches/react/types/theme").Token<"4", string, "radii", "">;
        round: import("@stitches/react/types/theme").Token<"round", string, "radii", "">;
        pill: import("@stitches/react/types/theme").Token<"pill", string, "radii", "">;
    };
}, createTheme: <Argument0 extends string | ({
    space?: {
        0?: string | number | boolean | undefined;
        1?: string | number | boolean | undefined;
        2?: string | number | boolean | undefined;
        3?: string | number | boolean | undefined;
        4?: string | number | boolean | undefined;
        5?: string | number | boolean | undefined;
        6?: string | number | boolean | undefined;
        7?: string | number | boolean | undefined;
        8?: string | number | boolean | undefined;
        9?: string | number | boolean | undefined;
        10?: string | number | boolean | undefined;
        11?: string | number | boolean | undefined;
        12?: string | number | boolean | undefined;
        14?: string | number | boolean | undefined;
        16?: string | number | boolean | undefined;
        18?: string | number | boolean | undefined;
        20?: string | number | boolean | undefined;
        24?: string | number | boolean | undefined;
        32?: string | number | boolean | undefined;
        40?: string | number | boolean | undefined;
        48?: string | number | boolean | undefined;
        56?: string | number | boolean | undefined;
        64?: string | number | boolean | undefined;
        [-1]?: string | number | boolean | undefined;
        [-2]?: string | number | boolean | undefined;
        [-3]?: string | number | boolean | undefined;
        [-4]?: string | number | boolean | undefined;
        [-5]?: string | number | boolean | undefined;
        [-6]?: string | number | boolean | undefined;
        [-7]?: string | number | boolean | undefined;
        [-8]?: string | number | boolean | undefined;
        [-9]?: string | number | boolean | undefined;
        [-10]?: string | number | boolean | undefined;
        [-11]?: string | number | boolean | undefined;
        [-12]?: string | number | boolean | undefined;
        [-14]?: string | number | boolean | undefined;
        [-16]?: string | number | boolean | undefined;
        [-18]?: string | number | boolean | undefined;
        [-20]?: string | number | boolean | undefined;
        [-24]?: string | number | boolean | undefined;
        [-32]?: string | number | boolean | undefined;
        [-40]?: string | number | boolean | undefined;
        [-48]?: string | number | boolean | undefined;
        [-56]?: string | number | boolean | undefined;
        [-64]?: string | number | boolean | undefined;
        full?: string | number | boolean | undefined;
    } | undefined;
    radii?: {
        1?: string | number | boolean | undefined;
        2?: string | number | boolean | undefined;
        3?: string | number | boolean | undefined;
        4?: string | number | boolean | undefined;
        round?: string | number | boolean | undefined;
        pill?: string | number | boolean | undefined;
    } | undefined;
} & {
    [x: string]: {
        [x: string]: string | number | boolean;
        [x: number]: string | number | boolean;
    };
}), Argument1 extends string | ({
    space?: {
        0?: string | number | boolean | undefined;
        1?: string | number | boolean | undefined;
        2?: string | number | boolean | undefined;
        3?: string | number | boolean | undefined;
        4?: string | number | boolean | undefined;
        5?: string | number | boolean | undefined;
        6?: string | number | boolean | undefined;
        7?: string | number | boolean | undefined;
        8?: string | number | boolean | undefined;
        9?: string | number | boolean | undefined;
        10?: string | number | boolean | undefined;
        11?: string | number | boolean | undefined;
        12?: string | number | boolean | undefined;
        14?: string | number | boolean | undefined;
        16?: string | number | boolean | undefined;
        18?: string | number | boolean | undefined;
        20?: string | number | boolean | undefined;
        24?: string | number | boolean | undefined;
        32?: string | number | boolean | undefined;
        40?: string | number | boolean | undefined;
        48?: string | number | boolean | undefined;
        56?: string | number | boolean | undefined;
        64?: string | number | boolean | undefined;
        [-1]?: string | number | boolean | undefined;
        [-2]?: string | number | boolean | undefined;
        [-3]?: string | number | boolean | undefined;
        [-4]?: string | number | boolean | undefined;
        [-5]?: string | number | boolean | undefined;
        [-6]?: string | number | boolean | undefined;
        [-7]?: string | number | boolean | undefined;
        [-8]?: string | number | boolean | undefined;
        [-9]?: string | number | boolean | undefined;
        [-10]?: string | number | boolean | undefined;
        [-11]?: string | number | boolean | undefined;
        [-12]?: string | number | boolean | undefined;
        [-14]?: string | number | boolean | undefined;
        [-16]?: string | number | boolean | undefined;
        [-18]?: string | number | boolean | undefined;
        [-20]?: string | number | boolean | undefined;
        [-24]?: string | number | boolean | undefined;
        [-32]?: string | number | boolean | undefined;
        [-40]?: string | number | boolean | undefined;
        [-48]?: string | number | boolean | undefined;
        [-56]?: string | number | boolean | undefined;
        [-64]?: string | number | boolean | undefined;
        full?: string | number | boolean | undefined;
    } | undefined;
    radii?: {
        1?: string | number | boolean | undefined;
        2?: string | number | boolean | undefined;
        3?: string | number | boolean | undefined;
        4?: string | number | boolean | undefined;
        round?: string | number | boolean | undefined;
        pill?: string | number | boolean | undefined;
    } | undefined;
} & {
    [x: string]: {
        [x: string]: string | number | boolean;
        [x: number]: string | number | boolean;
    };
})>(nameOrScalesArg0: Argument0, nameOrScalesArg1?: Argument1 | undefined) => string & {
    className: string;
    selector: string;
} & (Argument0 extends string ? import("@stitches/react/types/stitches").ThemeTokens<Argument1, ""> : import("@stitches/react/types/stitches").ThemeTokens<Argument0, "">), config: {
    prefix: "";
    media: {
        bp1: "(min-width: 450px)";
        bp2: "(min-width: 768px)";
        bp3: "(min-width: 1170px)";
        bp4: "(min-width: 1440px)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    };
    theme: {
        space: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            14: string;
            16: string;
            18: string;
            20: string;
            24: string;
            32: string;
            40: string;
            48: string;
            56: string;
            64: string;
            '-1': string;
            '-2': string;
            '-3': string;
            '-4': string;
            '-5': string;
            '-6': string;
            '-7': string;
            '-8': string;
            '-9': string;
            '-10': string;
            '-11': string;
            '-12': string;
            '-14': string;
            '-16': string;
            '-18': string;
            '-20': string;
            '-24': string;
            '-32': string;
            '-40': string;
            '-48': string;
            '-56': string;
            '-64': string;
            full: string;
        };
        radii: {
            1: string;
            2: string;
            3: string;
            4: string;
            round: string;
            pill: string;
        };
    };
    themeMap: import("@stitches/react/types/config").DefaultThemeMap;
    utils: {
        m: (value: Stitches.PropertyValue<'margin'>) => {
            margin: {
                readonly [Stitches.$$PropertyValue]: "margin";
            };
        };
        mt: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        mr: (value: Stitches.PropertyValue<'marginRight'>) => {
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginRight";
            };
        };
        mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginBottom";
            };
        };
        ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        my: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        p: (value: Stitches.PropertyValue<'padding'>) => {
            padding: {
                readonly [Stitches.$$PropertyValue]: "padding";
            };
        };
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingRight";
            };
        };
        pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingBottom";
            };
        };
        pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        py: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        bg: (value: Stitches.PropertyValue<'background'>) => {
            background: {
                readonly [Stitches.$$PropertyValue]: "background";
            };
        };
        br: (value: Stitches.PropertyValue<'borderRadius'>) => {
            borderRadius: {
                readonly [Stitches.$$PropertyValue]: "borderRadius";
            };
        };
        ta: (value: Stitches.PropertyValue<'textAlign'>) => {
            textAlign: {
                readonly [Stitches.$$PropertyValue]: "textAlign";
            };
        };
        fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
            flexDirection: {
                readonly [Stitches.$$PropertyValue]: "flexDirection";
            };
        };
        fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
            flexWrap: {
                readonly [Stitches.$$PropertyValue]: "flexWrap";
            };
        };
        ai: (value: Stitches.PropertyValue<'alignItems'>) => {
            alignItems: {
                readonly [Stitches.$$PropertyValue]: "alignItems";
            };
        };
        ac: (value: Stitches.PropertyValue<'alignContent'>) => {
            alignContent: {
                readonly [Stitches.$$PropertyValue]: "alignContent";
            };
        };
        jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
            justifyContent: {
                readonly [Stitches.$$PropertyValue]: "justifyContent";
            };
        };
        as: (value: Stitches.PropertyValue<'alignSelf'>) => {
            alignSelf: {
                readonly [Stitches.$$PropertyValue]: "alignSelf";
            };
        };
        fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
            flexGrow: {
                readonly [Stitches.$$PropertyValue]: "flexGrow";
            };
        };
        fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
            flexShrink: {
                readonly [Stitches.$$PropertyValue]: "flexShrink";
            };
        };
        fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
            flexBasis: {
                readonly [Stitches.$$PropertyValue]: "flexBasis";
            };
        };
        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
            backgroundColor: {
                readonly [Stitches.$$PropertyValue]: "backgroundColor";
            };
        };
        btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
            borderTopRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
            };
        };
        bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
            borderBottomRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
            };
        };
        bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
            borderBottomLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
            };
        };
        btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
            borderTopLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
            };
        };
        bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
            boxShadow: {
                readonly [Stitches.$$PropertyValue]: "boxShadow";
            };
        };
        lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
            lineHeight: {
                readonly [Stitches.$$PropertyValue]: "lineHeight";
            };
        };
        ox: (value: Stitches.PropertyValue<'overflowX'>) => {
            overflowX: {
                readonly [Stitches.$$PropertyValue]: "overflowX";
            };
        };
        oy: (value: Stitches.PropertyValue<'overflowY'>) => {
            overflowY: {
                readonly [Stitches.$$PropertyValue]: "overflowY";
            };
        };
        pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
            pointerEvents: {
                readonly [Stitches.$$PropertyValue]: "pointerEvents";
            };
        };
        us: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        size: (value: Stitches.PropertyValue<'width'>) => {
            width: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
            height: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
        };
        appearance: (value: Stitches.PropertyValue<'appearance'>) => {
            WebkitAppearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
            appearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
        };
        backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
            WebkitBackgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
            backgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
        };
        lineClamp: (value: number) => {
            display: string;
            WebkitLineClamp: number;
            WebkitBoxOrient: string;
            overflow: string;
        };
        truncate: (value: boolean) => "" | {
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
    };
};
export declare const tokenVariants: <T extends number | typeof Symbol.iterator | "fixed" | "repeat" | "space" | "slice" | "small" | "sub" | "bold" | "blink" | "radii" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "split" | "substring" | "toLowerCase" | "toLocaleLowerCase" | "toUpperCase" | "toLocaleUpperCase" | "trim" | "length" | "substr" | "codePointAt" | "includes" | "endsWith" | "normalize" | "startsWith" | "anchor" | "big" | "fontcolor" | "fontsize" | "italics" | "link" | "strike" | "sup" | "padStart" | "padEnd" | "trimEnd" | "trimStart" | "trimLeft" | "trimRight" | "matchAll" | "replaceAll" | "at" | "toString" | "valueOf" | "className" | "selector">(config: {
    token: T;
    css: (value: T extends "space" | "radii" ? `$${string & keyof {
        space: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            14: string;
            16: string;
            18: string;
            20: string;
            24: string;
            32: string;
            40: string;
            48: string;
            56: string;
            64: string;
            '-1': string;
            '-2': string;
            '-3': string;
            '-4': string;
            '-5': string;
            '-6': string;
            '-7': string;
            '-8': string;
            '-9': string;
            '-10': string;
            '-11': string;
            '-12': string;
            '-14': string;
            '-16': string;
            '-18': string;
            '-20': string;
            '-24': string;
            '-32': string;
            '-40': string;
            '-48': string;
            '-56': string;
            '-64': string;
            full: string;
        };
        radii: {
            1: string;
            2: string;
            3: string;
            4: string;
            round: string;
            pill: string;
        };
    }[T]}` : never) => CSS;
}) => Record<keyof (string & {
    className: string;
    selector: string;
} & {
    space: {
        0: import("@stitches/react/types/theme").Token<"0", string, "space", "">;
        1: import("@stitches/react/types/theme").Token<"1", string, "space", "">;
        2: import("@stitches/react/types/theme").Token<"2", string, "space", "">;
        3: import("@stitches/react/types/theme").Token<"3", string, "space", "">;
        4: import("@stitches/react/types/theme").Token<"4", string, "space", "">;
        5: import("@stitches/react/types/theme").Token<"5", string, "space", "">;
        6: import("@stitches/react/types/theme").Token<"6", string, "space", "">;
        7: import("@stitches/react/types/theme").Token<"7", string, "space", "">;
        8: import("@stitches/react/types/theme").Token<"8", string, "space", "">;
        9: import("@stitches/react/types/theme").Token<"9", string, "space", "">;
        10: import("@stitches/react/types/theme").Token<"10", string, "space", "">;
        11: import("@stitches/react/types/theme").Token<"11", string, "space", "">;
        12: import("@stitches/react/types/theme").Token<"12", string, "space", "">;
        14: import("@stitches/react/types/theme").Token<"14", string, "space", "">;
        16: import("@stitches/react/types/theme").Token<"16", string, "space", "">;
        18: import("@stitches/react/types/theme").Token<"18", string, "space", "">;
        20: import("@stitches/react/types/theme").Token<"20", string, "space", "">;
        24: import("@stitches/react/types/theme").Token<"24", string, "space", "">;
        32: import("@stitches/react/types/theme").Token<"32", string, "space", "">;
        40: import("@stitches/react/types/theme").Token<"40", string, "space", "">;
        48: import("@stitches/react/types/theme").Token<"48", string, "space", "">;
        56: import("@stitches/react/types/theme").Token<"56", string, "space", "">;
        64: import("@stitches/react/types/theme").Token<"64", string, "space", "">;
        [-1]: import("@stitches/react/types/theme").Token<"-1", string, "space", "">;
        [-2]: import("@stitches/react/types/theme").Token<"-2", string, "space", "">;
        [-3]: import("@stitches/react/types/theme").Token<"-3", string, "space", "">;
        [-4]: import("@stitches/react/types/theme").Token<"-4", string, "space", "">;
        [-5]: import("@stitches/react/types/theme").Token<"-5", string, "space", "">;
        [-6]: import("@stitches/react/types/theme").Token<"-6", string, "space", "">;
        [-7]: import("@stitches/react/types/theme").Token<"-7", string, "space", "">;
        [-8]: import("@stitches/react/types/theme").Token<"-8", string, "space", "">;
        [-9]: import("@stitches/react/types/theme").Token<"-9", string, "space", "">;
        [-10]: import("@stitches/react/types/theme").Token<"-10", string, "space", "">;
        [-11]: import("@stitches/react/types/theme").Token<"-11", string, "space", "">;
        [-12]: import("@stitches/react/types/theme").Token<"-12", string, "space", "">;
        [-14]: import("@stitches/react/types/theme").Token<"-14", string, "space", "">;
        [-16]: import("@stitches/react/types/theme").Token<"-16", string, "space", "">;
        [-18]: import("@stitches/react/types/theme").Token<"-18", string, "space", "">;
        [-20]: import("@stitches/react/types/theme").Token<"-20", string, "space", "">;
        [-24]: import("@stitches/react/types/theme").Token<"-24", string, "space", "">;
        [-32]: import("@stitches/react/types/theme").Token<"-32", string, "space", "">;
        [-40]: import("@stitches/react/types/theme").Token<"-40", string, "space", "">;
        [-48]: import("@stitches/react/types/theme").Token<"-48", string, "space", "">;
        [-56]: import("@stitches/react/types/theme").Token<"-56", string, "space", "">;
        [-64]: import("@stitches/react/types/theme").Token<"-64", string, "space", "">;
        full: import("@stitches/react/types/theme").Token<"full", string, "space", "">;
    };
    radii: {
        1: import("@stitches/react/types/theme").Token<"1", string, "radii", "">;
        2: import("@stitches/react/types/theme").Token<"2", string, "radii", "">;
        3: import("@stitches/react/types/theme").Token<"3", string, "radii", "">;
        4: import("@stitches/react/types/theme").Token<"4", string, "radii", "">;
        round: import("@stitches/react/types/theme").Token<"round", string, "radii", "">;
        pill: import("@stitches/react/types/theme").Token<"pill", string, "radii", "">;
    };
})[T], CSS>;
export declare type CSS = Stitches.CSS<typeof config>;
export declare type ResponsiveSpace = Stitches.VariantProps<typeof Box>['margin'];
export declare const stitchesConfig: {
    prefix: "";
    media: {
        bp1: "(min-width: 450px)";
        bp2: "(min-width: 768px)";
        bp3: "(min-width: 1170px)";
        bp4: "(min-width: 1440px)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    };
    theme: {
        space: {
            0: string;
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            9: string;
            10: string;
            11: string;
            12: string;
            14: string;
            16: string;
            18: string;
            20: string;
            24: string;
            32: string;
            40: string;
            48: string;
            56: string;
            64: string;
            '-1': string;
            '-2': string;
            '-3': string;
            '-4': string;
            '-5': string;
            '-6': string;
            '-7': string;
            '-8': string;
            '-9': string;
            '-10': string;
            '-11': string;
            '-12': string;
            '-14': string;
            '-16': string;
            '-18': string;
            '-20': string;
            '-24': string;
            '-32': string;
            '-40': string;
            '-48': string;
            '-56': string;
            '-64': string;
            full: string;
        };
        radii: {
            1: string;
            2: string;
            3: string;
            4: string;
            round: string;
            pill: string;
        };
    };
    themeMap: import("@stitches/react/types/config").DefaultThemeMap;
    utils: {
        m: (value: Stitches.PropertyValue<'margin'>) => {
            margin: {
                readonly [Stitches.$$PropertyValue]: "margin";
            };
        };
        mt: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        mr: (value: Stitches.PropertyValue<'marginRight'>) => {
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginRight";
            };
        };
        mb: (value: Stitches.PropertyValue<'marginBottom'>) => {
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginBottom";
            };
        };
        ml: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        mx: (value: Stitches.PropertyValue<'marginLeft'>) => {
            marginLeft: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
            marginRight: {
                readonly [Stitches.$$PropertyValue]: "marginLeft";
            };
        };
        my: (value: Stitches.PropertyValue<'marginTop'>) => {
            marginTop: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
            marginBottom: {
                readonly [Stitches.$$PropertyValue]: "marginTop";
            };
        };
        p: (value: Stitches.PropertyValue<'padding'>) => {
            padding: {
                readonly [Stitches.$$PropertyValue]: "padding";
            };
        };
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        pr: (value: Stitches.PropertyValue<'paddingRight'>) => {
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingRight";
            };
        };
        pb: (value: Stitches.PropertyValue<'paddingBottom'>) => {
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingBottom";
            };
        };
        pl: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        px: (value: Stitches.PropertyValue<'paddingLeft'>) => {
            paddingLeft: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
            paddingRight: {
                readonly [Stitches.$$PropertyValue]: "paddingLeft";
            };
        };
        py: (value: Stitches.PropertyValue<'paddingTop'>) => {
            paddingTop: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
            paddingBottom: {
                readonly [Stitches.$$PropertyValue]: "paddingTop";
            };
        };
        bg: (value: Stitches.PropertyValue<'background'>) => {
            background: {
                readonly [Stitches.$$PropertyValue]: "background";
            };
        };
        br: (value: Stitches.PropertyValue<'borderRadius'>) => {
            borderRadius: {
                readonly [Stitches.$$PropertyValue]: "borderRadius";
            };
        };
        ta: (value: Stitches.PropertyValue<'textAlign'>) => {
            textAlign: {
                readonly [Stitches.$$PropertyValue]: "textAlign";
            };
        };
        fd: (value: Stitches.PropertyValue<'flexDirection'>) => {
            flexDirection: {
                readonly [Stitches.$$PropertyValue]: "flexDirection";
            };
        };
        fw: (value: Stitches.PropertyValue<'flexWrap'>) => {
            flexWrap: {
                readonly [Stitches.$$PropertyValue]: "flexWrap";
            };
        };
        ai: (value: Stitches.PropertyValue<'alignItems'>) => {
            alignItems: {
                readonly [Stitches.$$PropertyValue]: "alignItems";
            };
        };
        ac: (value: Stitches.PropertyValue<'alignContent'>) => {
            alignContent: {
                readonly [Stitches.$$PropertyValue]: "alignContent";
            };
        };
        jc: (value: Stitches.PropertyValue<'justifyContent'>) => {
            justifyContent: {
                readonly [Stitches.$$PropertyValue]: "justifyContent";
            };
        };
        as: (value: Stitches.PropertyValue<'alignSelf'>) => {
            alignSelf: {
                readonly [Stitches.$$PropertyValue]: "alignSelf";
            };
        };
        fg: (value: Stitches.PropertyValue<'flexGrow'>) => {
            flexGrow: {
                readonly [Stitches.$$PropertyValue]: "flexGrow";
            };
        };
        fs: (value: Stitches.PropertyValue<'flexShrink'>) => {
            flexShrink: {
                readonly [Stitches.$$PropertyValue]: "flexShrink";
            };
        };
        fb: (value: Stitches.PropertyValue<'flexBasis'>) => {
            flexBasis: {
                readonly [Stitches.$$PropertyValue]: "flexBasis";
            };
        };
        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => {
            backgroundColor: {
                readonly [Stitches.$$PropertyValue]: "backgroundColor";
            };
        };
        btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => {
            borderTopRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
            };
        };
        bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => {
            borderBottomRightRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
            };
        };
        bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => {
            borderBottomLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
            };
        };
        btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => {
            borderTopLeftRadius: {
                readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
            };
        };
        bs: (value: Stitches.PropertyValue<'boxShadow'>) => {
            boxShadow: {
                readonly [Stitches.$$PropertyValue]: "boxShadow";
            };
        };
        lh: (value: Stitches.PropertyValue<'lineHeight'>) => {
            lineHeight: {
                readonly [Stitches.$$PropertyValue]: "lineHeight";
            };
        };
        ox: (value: Stitches.PropertyValue<'overflowX'>) => {
            overflowX: {
                readonly [Stitches.$$PropertyValue]: "overflowX";
            };
        };
        oy: (value: Stitches.PropertyValue<'overflowY'>) => {
            overflowY: {
                readonly [Stitches.$$PropertyValue]: "overflowY";
            };
        };
        pe: (value: Stitches.PropertyValue<'pointerEvents'>) => {
            pointerEvents: {
                readonly [Stitches.$$PropertyValue]: "pointerEvents";
            };
        };
        us: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        userSelect: (value: Stitches.PropertyValue<'userSelect'>) => {
            WebkitUserSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
            userSelect: {
                readonly [Stitches.$$PropertyValue]: "userSelect";
            };
        };
        size: (value: Stitches.PropertyValue<'width'>) => {
            width: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
            height: {
                readonly [Stitches.$$PropertyValue]: "width";
            };
        };
        appearance: (value: Stitches.PropertyValue<'appearance'>) => {
            WebkitAppearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
            appearance: {
                readonly [Stitches.$$PropertyValue]: "appearance";
            };
        };
        backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => {
            WebkitBackgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
            backgroundClip: {
                readonly [Stitches.$$PropertyValue]: "backgroundClip";
            };
        };
        lineClamp: (value: number) => {
            display: string;
            WebkitLineClamp: number;
            WebkitBoxOrient: string;
            overflow: string;
        };
        truncate: (value: boolean) => "" | {
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
    };
};
