declare const Box: import("@stitches/react/types/styled-component").StyledComponent<"div", {
    display?: "flex" | "grid" | "none" | "contents" | "block" | "inline" | "table" | "table-cell" | "table-column" | "table-column-group" | "table-footer-group" | "table-header-group" | "table-row" | "table-row-group" | "inline-block" | "inline-flex" | "inline-grid" | "inline-table" | "list-item" | "inherit" | "initial" | "unset" | undefined;
    borderRadius?: number | "1" | "2" | "3" | "4" | "round" | "pill" | undefined;
    m?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    margin?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    mx?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginX?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    my?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginY?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    ml?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginLeft?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    mr?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginRight?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    mt?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginTop?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    mb?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    marginBottom?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    p?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    padding?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    px?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingX?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    py?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingY?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    pl?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingLeft?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    pr?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingRight?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    pt?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingTop?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    pb?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
    paddingBottom?: number | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "14" | "16" | "18" | "20" | "24" | "32" | "40" | "48" | "56" | "64" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-14" | "-16" | "-18" | "-20" | "-24" | "-32" | "-40" | "-48" | "-56" | "-64" | "full" | "fullVw" | "fullVh" | undefined;
}, {
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    motion: "(prefers-reduced-motion)";
    hover: "(any-hover: hover)";
    dark: "(prefers-color-scheme: dark)";
    light: "(prefers-color-scheme: light)";
}, import("@stitches/react/types/css-util").CSS<{
    bp1: "(min-width: 450px)";
    bp2: "(min-width: 768px)";
    bp3: "(min-width: 1170px)";
    bp4: "(min-width: 1440px)";
    motion: "(prefers-reduced-motion)";
    hover: "(any-hover: hover)";
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
        fullVw: string;
        fullVh: string;
    };
    sizes: {
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
        fullVw: string;
        fullVh: string;
    };
    radii: {
        1: string;
        2: string;
        3: string;
        4: string;
        round: string;
        pill: string;
    };
    zIndices: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        max: string;
    };
}, import("@stitches/react/types/config").DefaultThemeMap, {
    m: (value: {
        readonly [$$PropertyValue]: "margin";
    }) => {
        margin: {
            readonly [$$PropertyValue]: "margin";
        };
    };
    mt: (value: {
        readonly [$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [$$PropertyValue]: "marginTop";
        };
    };
    mr: (value: {
        readonly [$$PropertyValue]: "marginRight";
    }) => {
        marginRight: {
            readonly [$$PropertyValue]: "marginRight";
        };
    };
    mb: (value: {
        readonly [$$PropertyValue]: "marginBottom";
    }) => {
        marginBottom: {
            readonly [$$PropertyValue]: "marginBottom";
        };
    };
    ml: (value: {
        readonly [$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [$$PropertyValue]: "marginLeft";
        };
    };
    mx: (value: {
        readonly [$$PropertyValue]: "marginLeft";
    }) => {
        marginLeft: {
            readonly [$$PropertyValue]: "marginLeft";
        };
        marginRight: {
            readonly [$$PropertyValue]: "marginLeft";
        };
    };
    my: (value: {
        readonly [$$PropertyValue]: "marginTop";
    }) => {
        marginTop: {
            readonly [$$PropertyValue]: "marginTop";
        };
        marginBottom: {
            readonly [$$PropertyValue]: "marginTop";
        };
    };
    p: (value: {
        readonly [$$PropertyValue]: "padding";
    }) => {
        padding: {
            readonly [$$PropertyValue]: "padding";
        };
    };
    pt: (value: {
        readonly [$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [$$PropertyValue]: "paddingTop";
        };
    };
    pr: (value: {
        readonly [$$PropertyValue]: "paddingRight";
    }) => {
        paddingRight: {
            readonly [$$PropertyValue]: "paddingRight";
        };
    };
    pb: (value: {
        readonly [$$PropertyValue]: "paddingBottom";
    }) => {
        paddingBottom: {
            readonly [$$PropertyValue]: "paddingBottom";
        };
    };
    pl: (value: {
        readonly [$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [$$PropertyValue]: "paddingLeft";
        };
    };
    px: (value: {
        readonly [$$PropertyValue]: "paddingLeft";
    }) => {
        paddingLeft: {
            readonly [$$PropertyValue]: "paddingLeft";
        };
        paddingRight: {
            readonly [$$PropertyValue]: "paddingLeft";
        };
    };
    py: (value: {
        readonly [$$PropertyValue]: "paddingTop";
    }) => {
        paddingTop: {
            readonly [$$PropertyValue]: "paddingTop";
        };
        paddingBottom: {
            readonly [$$PropertyValue]: "paddingTop";
        };
    };
    bg: (value: {
        readonly [$$PropertyValue]: "background";
    }) => {
        background: {
            readonly [$$PropertyValue]: "background";
        };
    };
    br: (value: {
        readonly [$$PropertyValue]: "borderRadius";
    }) => {
        borderRadius: {
            readonly [$$PropertyValue]: "borderRadius";
        };
    };
    ta: (value: {
        readonly [$$PropertyValue]: "textAlign";
    }) => {
        textAlign: {
            readonly [$$PropertyValue]: "textAlign";
        };
    };
    fd: (value: {
        readonly [$$PropertyValue]: "flexDirection";
    }) => {
        flexDirection: {
            readonly [$$PropertyValue]: "flexDirection";
        };
    };
    fw: (value: {
        readonly [$$PropertyValue]: "flexWrap";
    }) => {
        flexWrap: {
            readonly [$$PropertyValue]: "flexWrap";
        };
    };
    ai: (value: {
        readonly [$$PropertyValue]: "alignItems";
    }) => {
        alignItems: {
            readonly [$$PropertyValue]: "alignItems";
        };
    };
    ac: (value: {
        readonly [$$PropertyValue]: "alignContent";
    }) => {
        alignContent: {
            readonly [$$PropertyValue]: "alignContent";
        };
    };
    jc: (value: {
        readonly [$$PropertyValue]: "justifyContent";
    }) => {
        justifyContent: {
            readonly [$$PropertyValue]: "justifyContent";
        };
    };
    as: (value: {
        readonly [$$PropertyValue]: "alignSelf";
    }) => {
        alignSelf: {
            readonly [$$PropertyValue]: "alignSelf";
        };
    };
    fg: (value: {
        readonly [$$PropertyValue]: "flexGrow";
    }) => {
        flexGrow: {
            readonly [$$PropertyValue]: "flexGrow";
        };
    };
    fs: (value: {
        readonly [$$PropertyValue]: "flexShrink";
    }) => {
        flexShrink: {
            readonly [$$PropertyValue]: "flexShrink";
        };
    };
    fb: (value: {
        readonly [$$PropertyValue]: "flexBasis";
    }) => {
        flexBasis: {
            readonly [$$PropertyValue]: "flexBasis";
        };
    };
    bc: (value: {
        readonly [$$PropertyValue]: "backgroundColor";
    }) => {
        backgroundColor: {
            readonly [$$PropertyValue]: "backgroundColor";
        };
    };
    btrr: (value: {
        readonly [$$PropertyValue]: "borderTopRightRadius";
    }) => {
        borderTopRightRadius: {
            readonly [$$PropertyValue]: "borderTopRightRadius";
        };
    };
    bbrr: (value: {
        readonly [$$PropertyValue]: "borderBottomRightRadius";
    }) => {
        borderBottomRightRadius: {
            readonly [$$PropertyValue]: "borderBottomRightRadius";
        };
    };
    bblr: (value: {
        readonly [$$PropertyValue]: "borderBottomLeftRadius";
    }) => {
        borderBottomLeftRadius: {
            readonly [$$PropertyValue]: "borderBottomLeftRadius";
        };
    };
    btlr: (value: {
        readonly [$$PropertyValue]: "borderTopLeftRadius";
    }) => {
        borderTopLeftRadius: {
            readonly [$$PropertyValue]: "borderTopLeftRadius";
        };
    };
    bs: (value: {
        readonly [$$PropertyValue]: "boxShadow";
    }) => {
        boxShadow: {
            readonly [$$PropertyValue]: "boxShadow";
        };
    };
    lh: (value: {
        readonly [$$PropertyValue]: "lineHeight";
    }) => {
        lineHeight: {
            readonly [$$PropertyValue]: "lineHeight";
        };
    };
    ox: (value: {
        readonly [$$PropertyValue]: "overflowX";
    }) => {
        overflowX: {
            readonly [$$PropertyValue]: "overflowX";
        };
    };
    oy: (value: {
        readonly [$$PropertyValue]: "overflowY";
    }) => {
        overflowY: {
            readonly [$$PropertyValue]: "overflowY";
        };
    };
    pe: (value: {
        readonly [$$PropertyValue]: "pointerEvents";
    }) => {
        pointerEvents: {
            readonly [$$PropertyValue]: "pointerEvents";
        };
    };
    us: (value: {
        readonly [$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [$$PropertyValue]: "userSelect";
        };
    };
    userSelect: (value: {
        readonly [$$PropertyValue]: "userSelect";
    }) => {
        WebkitUserSelect: {
            readonly [$$PropertyValue]: "userSelect";
        };
        userSelect: {
            readonly [$$PropertyValue]: "userSelect";
        };
    };
    size: (value: {
        readonly [$$PropertyValue]: "width";
    }) => {
        width: {
            readonly [$$PropertyValue]: "width";
        };
        height: {
            readonly [$$PropertyValue]: "width";
        };
    };
    appearance: (value: {
        readonly [$$PropertyValue]: "appearance";
    }) => {
        WebkitAppearance: {
            readonly [$$PropertyValue]: "appearance";
        };
        appearance: {
            readonly [$$PropertyValue]: "appearance";
        };
    };
    backgroundClip: (value: {
        readonly [$$PropertyValue]: "backgroundClip";
    }) => {
        WebkitBackgroundClip: {
            readonly [$$PropertyValue]: "backgroundClip";
        };
        backgroundClip: {
            readonly [$$PropertyValue]: "backgroundClip";
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
export { Box };
