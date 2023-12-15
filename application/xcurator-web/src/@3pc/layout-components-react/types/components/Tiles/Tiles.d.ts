import React, { ReactNode } from 'react';
import type * as Stitches from '@stitches/react';
import { ResponsiveSpace } from '../../stitches.config';
declare const TileBox: import("@stitches/react/types/styled-component").StyledComponent<import("@stitches/react/types/styled-component").StyledComponent<"div", {
    display?: "flex" | "grid" | "none" | "contents" | "block" | "inline" | "table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "inherit" | "initial" | "unset" | undefined;
    borderRadius?: number | "1" | "2" | "3" | "4" | "round" | "pill" | undefined;
    m?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    margin?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    mx?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginX?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    my?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginY?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    ml?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginLeft?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    mr?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginRight?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    mt?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginTop?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    mb?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    marginBottom?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    p?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    padding?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    px?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingX?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    py?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingY?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    pl?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingLeft?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    pr?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingRight?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    pt?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingTop?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    pb?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
    paddingBottom?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | undefined;
}, {
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
    m: (value: {
        readonly [Stitches.$$PropertyValue]: "margin";
    }) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: {
        readonly [Stitches.$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: {
        readonly [Stitches.$$PropertyValue]: "marginRight";
    }) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: {
        readonly [Stitches.$$PropertyValue]: "marginBottom";
    }) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: {
        readonly [Stitches.$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: {
        readonly [Stitches.$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: {
        readonly [Stitches.$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: {
        readonly [Stitches.$$PropertyValue]: "padding";
    }) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingRight";
    }) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingBottom";
    }) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: {
        readonly [Stitches.$$PropertyValue]: "background";
    }) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: {
        readonly [Stitches.$$PropertyValue]: "borderRadius";
    }) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: {
        readonly [Stitches.$$PropertyValue]: "textAlign";
    }) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: {
        readonly [Stitches.$$PropertyValue]: "flexDirection";
    }) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: {
        readonly [Stitches.$$PropertyValue]: "flexWrap";
    }) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: {
        readonly [Stitches.$$PropertyValue]: "alignItems";
    }) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: {
        readonly [Stitches.$$PropertyValue]: "alignContent";
    }) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: {
        readonly [Stitches.$$PropertyValue]: "justifyContent";
    }) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: {
        readonly [Stitches.$$PropertyValue]: "alignSelf";
    }) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: {
        readonly [Stitches.$$PropertyValue]: "flexGrow";
    }) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: {
        readonly [Stitches.$$PropertyValue]: "flexShrink";
    }) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: {
        readonly [Stitches.$$PropertyValue]: "flexBasis";
    }) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: {
        readonly [Stitches.$$PropertyValue]: "backgroundColor";
    }) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
    }) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
    }) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
    }) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
    }) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: {
        readonly [Stitches.$$PropertyValue]: "boxShadow";
    }) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: {
        readonly [Stitches.$$PropertyValue]: "lineHeight";
    }) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: {
        readonly [Stitches.$$PropertyValue]: "overflowX";
    }) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: {
        readonly [Stitches.$$PropertyValue]: "overflowY";
    }) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: {
        readonly [Stitches.$$PropertyValue]: "pointerEvents";
    }) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: {
        readonly [Stitches.$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: {
        readonly [Stitches.$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: {
        readonly [Stitches.$$PropertyValue]: "width";
    }) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: {
        readonly [Stitches.$$PropertyValue]: "appearance";
    }) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: {
        readonly [Stitches.$$PropertyValue]: "backgroundClip";
    }) => {
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
}>>, {
    columns?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined;
}, {
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
    m: (value: {
        readonly [Stitches.$$PropertyValue]: "margin";
    }) => {
        margin: {
            readonly [Stitches.$$PropertyValue]: "margin";
        };
    };
    mt: (value: {
        readonly [Stitches.$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: {
        readonly [Stitches.$$PropertyValue]: "marginRight";
    }) => {
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: {
        readonly [Stitches.$$PropertyValue]: "marginBottom";
    }) => {
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: {
        readonly [Stitches.$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: {
        readonly [Stitches.$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [Stitches.$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: {
        readonly [Stitches.$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [Stitches.$$PropertyValue]: "marginTop";
        };
    };
    p: (value: {
        readonly [Stitches.$$PropertyValue]: "padding";
    }) => {
        padding: {
            readonly [Stitches.$$PropertyValue]: "padding";
        };
    };
    pt: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingRight";
    }) => {
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingBottom";
    }) => {
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [Stitches.$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: {
        readonly [Stitches.$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [Stitches.$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: {
        readonly [Stitches.$$PropertyValue]: "background";
    }) => {
        background: {
            readonly [Stitches.$$PropertyValue]: "background";
        };
    };
    br: (value: {
        readonly [Stitches.$$PropertyValue]: "borderRadius";
    }) => {
        borderRadius: {
            readonly [Stitches.$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: {
        readonly [Stitches.$$PropertyValue]: "textAlign";
    }) => {
        textAlign: {
            readonly [Stitches.$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: {
        readonly [Stitches.$$PropertyValue]: "flexDirection";
    }) => {
        flexDirection: {
            readonly [Stitches.$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: {
        readonly [Stitches.$$PropertyValue]: "flexWrap";
    }) => {
        flexWrap: {
            readonly [Stitches.$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: {
        readonly [Stitches.$$PropertyValue]: "alignItems";
    }) => {
        alignItems: {
            readonly [Stitches.$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: {
        readonly [Stitches.$$PropertyValue]: "alignContent";
    }) => {
        alignContent: {
            readonly [Stitches.$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: {
        readonly [Stitches.$$PropertyValue]: "justifyContent";
    }) => {
        justifyContent: {
            readonly [Stitches.$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: {
        readonly [Stitches.$$PropertyValue]: "alignSelf";
    }) => {
        alignSelf: {
            readonly [Stitches.$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: {
        readonly [Stitches.$$PropertyValue]: "flexGrow";
    }) => {
        flexGrow: {
            readonly [Stitches.$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: {
        readonly [Stitches.$$PropertyValue]: "flexShrink";
    }) => {
        flexShrink: {
            readonly [Stitches.$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: {
        readonly [Stitches.$$PropertyValue]: "flexBasis";
    }) => {
        flexBasis: {
            readonly [Stitches.$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: {
        readonly [Stitches.$$PropertyValue]: "backgroundColor";
    }) => {
        backgroundColor: {
            readonly [Stitches.$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
    }) => {
        borderTopRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
    }) => {
        borderBottomRightRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
    }) => {
        borderBottomLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: {
        readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
    }) => {
        borderTopLeftRadius: {
            readonly [Stitches.$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: {
        readonly [Stitches.$$PropertyValue]: "boxShadow";
    }) => {
        boxShadow: {
            readonly [Stitches.$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: {
        readonly [Stitches.$$PropertyValue]: "lineHeight";
    }) => {
        lineHeight: {
            readonly [Stitches.$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: {
        readonly [Stitches.$$PropertyValue]: "overflowX";
    }) => {
        overflowX: {
            readonly [Stitches.$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: {
        readonly [Stitches.$$PropertyValue]: "overflowY";
    }) => {
        overflowY: {
            readonly [Stitches.$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: {
        readonly [Stitches.$$PropertyValue]: "pointerEvents";
    }) => {
        pointerEvents: {
            readonly [Stitches.$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: {
        readonly [Stitches.$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: {
        readonly [Stitches.$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [Stitches.$$PropertyValue]: "userSelect";
        };
    };
    size: (value: {
        readonly [Stitches.$$PropertyValue]: "width";
    }) => {
        width: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
        height: {
            readonly [Stitches.$$PropertyValue]: "width";
        };
    };
    appearance: (value: {
        readonly [Stitches.$$PropertyValue]: "appearance";
    }) => {
        WebkitAppearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [Stitches.$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: {
        readonly [Stitches.$$PropertyValue]: "backgroundClip";
    }) => {
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
}>>;
declare const Tiles: React.ForwardRefExoticComponent<TilesProps & React.RefAttributes<HTMLDivElement>>;
export declare type TilesProps = {
    children: ReactNode;
    columns?: Stitches.VariantProps<typeof TileBox>['columns'];
    space?: ResponsiveSpace;
};
export { Tiles };
