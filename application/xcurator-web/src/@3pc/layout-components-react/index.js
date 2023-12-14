'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@stitches/react');
var flattenChildren = require('react-keyed-flatten-children');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var flattenChildren__default = /*#__PURE__*/_interopDefaultLegacy(flattenChildren);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var _a;
var styled = (_a = react.createStitches({
    media: {
        bp1: '(min-width: 450px)',
        bp2: '(min-width: 768px)',
        bp3: '(min-width: 1170px)',
        bp4: '(min-width: 1440px)',
        motion: '(prefers-reduced-motion)',
        hover: '(any-hover: hover)',
        dark: '(prefers-color-scheme: dark)',
        light: '(prefers-color-scheme: light)',
    },
    theme: {
        space: {
            0: '0',
            1: '0.25rem',
            2: '0.5rem',
            3: '0.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            18: '4.5rem',
            20: '5rem',
            24: '6rem',
            32: '8rem',
            40: '10rem',
            48: '12rem',
            56: '14rem',
            64: '16rem',
            '-1': '-0.25rem',
            '-2': '-0.5rem',
            '-3': '-0.75rem',
            '-4': '-1rem',
            '-5': '-1.25rem',
            '-6': '-1.5rem',
            '-7': '-1.75rem',
            '-8': '-2rem',
            '-9': '-2.25rem',
            '-10': '-2.5rem',
            '-11': '-2.75rem',
            '-12': '-3rem',
            '-14': '-3.5rem',
            '-16': '-4rem',
            '-18': '-4.5rem',
            '-20': '-5rem',
            '-24': '-6rem',
            '-32': '-8rem',
            '-40': '-10rem',
            '-48': '-12rem',
            '-56': '-14rem',
            '-64': '-16rem',
            full: '100%',
            fullVw: '100vw',
            fullVh: '100vh',
        },
        sizes: {
            0: '0',
            1: '0.25rem',
            2: '0.5rem',
            3: '0.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            18: '4.5rem',
            20: '5rem',
            24: '6rem',
            32: '8rem',
            40: '10rem',
            48: '12rem',
            56: '14rem',
            64: '16rem',
            '-1': '-0.25rem',
            '-2': '-0.5rem',
            '-3': '-0.75rem',
            '-4': '-1rem',
            '-5': '-1.25rem',
            '-6': '-1.5rem',
            '-7': '-1.75rem',
            '-8': '-2rem',
            '-9': '-2.25rem',
            '-10': '-2.5rem',
            '-11': '-2.75rem',
            '-12': '-3rem',
            '-14': '-3.5rem',
            '-16': '-4rem',
            '-18': '-4.5rem',
            '-20': '-5rem',
            '-24': '-6rem',
            '-32': '-8rem',
            '-40': '-10rem',
            '-48': '-12rem',
            '-56': '-14rem',
            '-64': '-16rem',
            full: '100%',
            fullVw: '100vw',
            fullVh: '100vh',
        },
        radii: {
            1: '4px',
            2: '6px',
            3: '8px',
            4: '12px',
            round: '50%',
            pill: '9999px',
        },
        zIndices: {
            1: '100',
            2: '200',
            3: '300',
            4: '400',
            5: '500',
            max: '999',
        },
    },
    utils: {
        // Abbreviated margin properties
        m: function (value) { return ({
            margin: value,
        }); },
        mt: function (value) { return ({
            marginTop: value,
        }); },
        mr: function (value) { return ({
            marginRight: value,
        }); },
        mb: function (value) { return ({
            marginBottom: value,
        }); },
        ml: function (value) { return ({
            marginLeft: value,
        }); },
        mx: function (value) { return ({
            marginLeft: value,
            marginRight: value,
        }); },
        my: function (value) { return ({
            marginTop: value,
            marginBottom: value,
        }); },
        // Abbreviated padding properties
        p: function (value) { return ({
            padding: value,
        }); },
        pt: function (value) { return ({
            paddingTop: value,
        }); },
        pr: function (value) { return ({
            paddingRight: value,
        }); },
        pb: function (value) { return ({
            paddingBottom: value,
        }); },
        pl: function (value) { return ({
            paddingLeft: value,
        }); },
        px: function (value) { return ({
            paddingLeft: value,
            paddingRight: value,
        }); },
        py: function (value) { return ({
            paddingTop: value,
            paddingBottom: value,
        }); },
        // Abbreviated misc properties
        bg: function (value) { return ({
            background: value,
        }); },
        br: function (value) { return ({
            borderRadius: value,
        }); },
        ta: function (value) { return ({ textAlign: value }); },
        fd: function (value) { return ({
            flexDirection: value,
        }); },
        fw: function (value) { return ({ flexWrap: value }); },
        ai: function (value) { return ({
            alignItems: value,
        }); },
        ac: function (value) { return ({
            alignContent: value,
        }); },
        jc: function (value) { return ({
            justifyContent: value,
        }); },
        as: function (value) { return ({ alignSelf: value }); },
        fg: function (value) { return ({ flexGrow: value }); },
        fs: function (value) { return ({
            flexShrink: value,
        }); },
        fb: function (value) { return ({ flexBasis: value }); },
        bc: function (value) { return ({
            backgroundColor: value,
        }); },
        btrr: function (value) { return ({
            borderTopRightRadius: value,
        }); },
        bbrr: function (value) { return ({
            borderBottomRightRadius: value,
        }); },
        bblr: function (value) { return ({
            borderBottomLeftRadius: value,
        }); },
        btlr: function (value) { return ({
            borderTopLeftRadius: value,
        }); },
        bs: function (value) { return ({ boxShadow: value }); },
        lh: function (value) { return ({
            lineHeight: value,
        }); },
        ox: function (value) { return ({ overflowX: value }); },
        oy: function (value) { return ({ overflowY: value }); },
        pe: function (value) { return ({
            pointerEvents: value,
        }); },
        us: function (value) { return ({
            WebkitUserSelect: value,
            userSelect: value,
        }); },
        userSelect: function (value) { return ({
            WebkitUserSelect: value,
            userSelect: value,
        }); },
        size: function (value) { return ({
            width: value,
            height: value,
        }); },
        appearance: function (value) { return ({
            WebkitAppearance: value,
            appearance: value,
        }); },
        backgroundClip: function (value) { return ({
            WebkitBackgroundClip: value,
            backgroundClip: value,
        }); },
        // Clamp a line of text to a certain number of rows
        lineClamp: function (value) { return ({
            display: '-webkit-box',
            WebkitLineClamp: value,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }); },
        // Truncate a line of text with an ellipsis
        truncate: function (value) {
            return value
                ? {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }
                : '';
        },
    },
}), _a.styled), css = _a.css, globalCss = _a.globalCss, keyframes = _a.keyframes, getCssText = _a.getCssText, theme = _a.theme, createTheme = _a.createTheme, config = _a.config;
// https://github.com/stitchesjs/stitches/issues/314#issuecomment-1028768285
var tokenVariants = function (config) {
    return Object.entries(theme[config.token]).reduce(function (previousValue, _a) {
        var _b;
        var _c = __read(_a, 2), key = _c[0], value = _c[1];
        return (__assign(__assign({}, previousValue), (_b = {}, _b[key] = config.css(value), _b)));
    }, {});
};

var Box = styled('div', {
    minWidth: 0,
    boxSizing: 'border-box',
    variants: {
        display: {
            none: {
                display: 'none',
            },
            inline: {
                display: 'inline',
            },
            block: {
                display: 'block',
            },
            contents: {
                display: 'contents',
            },
            'list-item': {
                display: 'list-item',
            },
            'inline-block': {
                display: 'inline-block',
            },
            'inline-table': {
                display: 'inline-table',
            },
            table: {
                display: 'table',
            },
            'table-cell': {
                display: 'table-cell',
            },
            'table-column': {
                display: 'table-column',
            },
            'table-column-group': {
                display: 'table-column-group',
            },
            'table-footer-group': {
                display: 'table-footer-group',
            },
            'table-header-group': {
                display: 'table-header-group',
            },
            'table-row': {
                display: 'table-row',
            },
            'table-row-group': {
                display: 'table-row-group',
            },
            flex: {
                display: 'flex',
            },
            'inline-flex': {
                display: 'inline-flex',
            },
            grid: {
                display: 'grid',
            },
            'inline-grid': {
                display: 'inline-grid',
            },
            inherit: {
                display: 'inherit',
            },
            initial: {
                display: 'initial',
            },
            unset: {
                display: 'unset',
            },
        },
        borderRadius: tokenVariants({
            token: 'radii',
            css: function (value) { return ({
                borderRadius: value,
            }); },
        }),
        m: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                m: value,
            }); },
        }),
        margin: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                m: value,
            }); },
        }),
        mx: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mx: value,
            }); },
        }),
        marginX: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mx: value,
            }); },
        }),
        my: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                my: value,
            }); },
        }),
        marginY: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                my: value,
            }); },
        }),
        ml: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                ml: value,
            }); },
        }),
        marginLeft: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                ml: value,
            }); },
        }),
        mr: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mr: value,
            }); },
        }),
        marginRight: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mr: value,
            }); },
        }),
        mt: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mt: value,
            }); },
        }),
        marginTop: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mt: value,
            }); },
        }),
        mb: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mb: value,
            }); },
        }),
        marginBottom: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                mb: value,
            }); },
        }),
        p: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                p: value,
            }); },
        }),
        padding: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                p: value,
            }); },
        }),
        px: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                px: value,
            }); },
        }),
        paddingX: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                px: value,
            }); },
        }),
        py: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                py: value,
            }); },
        }),
        paddingY: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                py: value,
            }); },
        }),
        pl: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pl: value,
            }); },
        }),
        paddingLeft: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pl: value,
            }); },
        }),
        pr: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pr: value,
            }); },
        }),
        paddingRight: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pr: value,
            }); },
        }),
        pt: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pt: value,
            }); },
        }),
        paddingTop: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pt: value,
            }); },
        }),
        pb: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pb: value,
            }); },
        }),
        paddingBottom: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                pb: value,
            }); },
        }),
    },
});
Box.displayName = 'Box';

var breakpoints = __spreadArray(['initial'], __read(Object.keys(config.media)), false);
function spaceToNegativeSpace(space) {
    var e_1, _a;
    if (!space)
        return undefined;
    if (typeof space === 'string' || typeof space === 'number')
        return -"".concat(space);
    else {
        var resp = {};
        try {
            for (var _b = __values(Object.entries(space)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                resp[key] = value ? -"".concat(value) : undefined;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return resp;
    }
}
function sliceSpace(space, maxBreakpoint) {
    var e_2, _a;
    if (!space || !maxBreakpoint)
        return undefined;
    var result = {};
    var maxIndex = breakpoints.indexOf(maxBreakpoint);
    try {
        for (var _b = __values(breakpoints.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], breakpoint = _d[1];
            var bp = "@".concat(breakpoint);
            if (index < maxIndex) {
                if (typeof space === 'number' || typeof space === 'string') {
                    result[bp] = space;
                }
                else {
                    result[bp] = space[bp];
                }
            }
            else if (index === maxIndex) {
                result[bp] = 0;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}

var Bleed = React.forwardRef(function (_a, forwardedRef) {
    var space = _a.space, horizontal = _a.horizontal, vertical = _a.vertical, top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right, _b = _a.as, as = _b === void 0 ? 'div' : _b, children = _a.children, props = __rest(_a, ["space", "horizontal", "vertical", "top", "bottom", "left", "right", "as", "children"]);
    var mt = spaceToNegativeSpace(top || vertical || space);
    var mb = spaceToNegativeSpace(bottom || vertical || space);
    var ml = spaceToNegativeSpace(left || horizontal || space);
    var mr = spaceToNegativeSpace(right || horizontal || space);
    return (React__default["default"].createElement(Box, __assign({}, props, { ref: forwardedRef, as: as, display: as === 'span' ? 'block' : undefined, mt: mt, mb: mb, ml: ml, mr: mr }),
        React__default["default"].createElement(Box, { display: as === 'span' ? 'block' : undefined, css: {
                position: 'relative',
            } }, children)));
});
Bleed.displayName = 'Bleed';

var ColumnContext = React.createContext({});
var mapToFlex = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end',
};
var Columns = React.forwardRef(function (_a, forwardedRef) {
    var _b;
    var space = _a.space, alignX = _a.alignX, alignY = _a.alignY, collapse = _a.collapse, children = _a.children, props = __rest(_a, ["space", "alignX", "alignY", "collapse", "children"]);
    var justifyContent = alignX ? mapToFlex[alignX] : undefined;
    var alignItems = alignY ? mapToFlex[alignY] : undefined;
    var negativeSpace = spaceToNegativeSpace(space);
    var collapseStyle = collapse
        ? (_b = {
                flexDirection: 'column'
            },
            _b["@".concat(collapse)] = {
                flexDirection: 'row',
            },
            _b) : {
        flexDirection: 'row',
    };
    var paddingTop = sliceSpace(space, collapse);
    return (React__default["default"].createElement(Box, __assign({}, props, { ref: forwardedRef, marginLeft: negativeSpace, css: __assign({ display: 'flex', alignItems: alignItems, justifyContent: justifyContent }, collapseStyle) }),
        React__default["default"].createElement(ColumnContext.Provider, { value: { paddingLeft: space, paddingTop: paddingTop } }, children)));
});
Columns.displayName = 'Columns';

var ColumnBox = styled(Box, {
    '&:first-of-type > *': {
        paddingTop: 0,
    },
});
var Column = React.forwardRef(function (_a, forwardedRef) {
    var width = _a.width, children = _a.children, props = __rest(_a, ["width", "children"]);
    var _b = React.useContext(ColumnContext), paddingLeft = _b.paddingLeft, paddingTop = _b.paddingTop;
    return (React__default["default"].createElement(ColumnBox, __assign({}, props, { ref: forwardedRef, css: {
            width: width !== 'content' ? '100%' : undefined,
            flexShrink: width === 'content' ? 0 : undefined,
            flex: typeof width === 'number'
                ? "0 0 ".concat(+width * 100, "%")
                : width === 'content'
                    ? undefined
                    : 1,
        } }),
        React__default["default"].createElement(Box, { paddingLeft: paddingLeft, paddingTop: paddingTop, css: {
                height: '100%',
            } }, children)));
});
Column.displayName = 'Column';

var Flex = styled('div', {
    display: 'flex',
    minWidth: 0,
    boxSizing: 'border-box',
    variants: {
        flexDirection: {
            row: {
                flexDirection: 'row',
            },
            column: {
                flexDirection: 'column',
            },
            rowReverse: {
                flexDirection: 'row-reverse',
            },
            columnReverse: {
                flexDirection: 'column-reverse',
            },
        },
        alignItems: {
            'flex-start': {
                alignItems: 'flex-start',
            },
            center: {
                alignItems: 'center',
            },
            'flex-end': {
                alignItems: 'flex-end',
            },
            stretch: {
                alignItems: 'stretch',
            },
            baseline: {
                alignItems: 'baseline',
            },
        },
        justifyContent: {
            'flex-start': {
                justifyContent: 'flex-start',
            },
            center: {
                justifyContent: 'center',
            },
            'flex-end': {
                justifyContent: 'flex-end',
            },
            'space-between': {
                justifyContent: 'space-between',
            },
            'space-around': {
                justifyContent: 'space-around',
            },
            'space-evenly': {
                justifyContent: 'space-evenly',
            },
        },
        flexWrap: {
            noWrap: {
                flexWrap: 'nowrap',
            },
            wrap: {
                flexWrap: 'wrap',
            },
            wrapReverse: {
                flexWrap: 'wrap-reverse',
            },
        },
        gap: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                gap: value,
            }); },
        }),
    },
    defaultVariants: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexWrap: 'noWrap',
    },
});

var Grid = styled('div', {
    display: 'grid',
    minWidth: 0,
    boxSizing: 'border-box',
    variants: {
        align: {
            start: {
                alignItems: 'start',
            },
            center: {
                alignItems: 'center',
            },
            end: {
                alignItems: 'end',
            },
            stretch: {
                alignItems: 'stretch',
            },
            baseline: {
                alignItems: 'baseline',
            },
        },
        justify: {
            start: {
                justifyContent: 'start',
            },
            center: {
                justifyContent: 'center',
            },
            end: {
                justifyContent: 'end',
            },
            between: {
                justifyContent: 'space-between',
            },
        },
        flow: {
            row: {
                gridAutoFlow: 'row',
            },
            column: {
                gridAutoFlow: 'column',
            },
            dense: {
                gridAutoFlow: 'dense',
            },
            rowDense: {
                gridAutoFlow: 'row dense',
            },
            columnDense: {
                gridAutoFlow: 'column dense',
            },
        },
        columns: {
            1: {
                gridTemplateColumns: 'repeat(1, 1fr)',
            },
            2: {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
            3: {
                gridTemplateColumns: 'repeat(3, 1fr)',
            },
            4: {
                gridTemplateColumns: 'repeat(4, 1fr)',
            },
        },
        rows: {
            1: {
                gridTemplateRows: 'repeat(1, 1fr)',
            },
            2: {
                gridTemplateRows: 'repeat(2, 1fr)',
            },
            3: {
                gridTemplateRows: 'repeat(3, 1fr)',
            },
            4: {
                gridTemplateRows: 'repeat(4, 1fr)',
            },
        },
        gap: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                gap: value,
            }); },
        }),
        gapX: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                columnGap: value,
            }); },
        }),
        gapY: tokenVariants({
            token: 'space',
            css: function (value) { return ({
                rowGap: value,
            }); },
        }),
    },
});

var Inliner = styled(Box, {
    display: 'flex',
    flexWrap: 'wrap',
    variants: {
        alignX: {
            left: {
                justifyContent: 'flex-start',
            },
            center: {
                justifyContent: 'center',
            },
            right: {
                justifyContent: 'flex-end',
            },
        },
        alignY: {
            top: {
                alignItems: 'flex-start',
            },
            center: {
                alignItems: 'center',
            },
            bottom: {
                alignItems: 'flex-end',
            },
        },
    },
});
var Inline = React.forwardRef(function (_a, forwardedRef) {
    var _b, _c;
    var space = _a.space, alignX = _a.alignX, alignY = _a.alignY, collapse = _a.collapse, children = _a.children, props = __rest(_a, ["space", "alignX", "alignY", "collapse", "children"]);
    var negativeSpace = spaceToNegativeSpace(space);
    var display = collapse
        ? (_b = {
                '@initial': 'flex'
            },
            _b["@".concat(collapse)] = 'block',
            _b) : 'block';
    var inlinerStyles = collapse
        ? (_c = {
                flexDirection: 'column'
            },
            _c["@".concat(collapse)] = {
                flexDirection: 'row',
            },
            _c) : {
        flexDirection: 'row',
    };
    var childStyles = variantToCss('justifyContent', alignX, {
        left: 'flex-start',
        right: 'flex-end',
    });
    return (React__default["default"].createElement(Box, { marginTop: negativeSpace },
        React__default["default"].createElement(Inliner, __assign({}, props, { marginLeft: negativeSpace, alignX: alignX, alignY: alignY, css: inlinerStyles, ref: forwardedRef }), React.Children.map(flattenChildren__default["default"](children), function (child) {
            return child !== null && child !== undefined ? (React__default["default"].createElement(Box, { display: display, paddingLeft: space, paddingTop: space, css: childStyles }, child)) : null;
        }))));
});
function variantToCss(property, variant, mapper) {
    var _a, e_1, _b, _c;
    if (!variant)
        return undefined;
    if (typeof variant === 'string') {
        var cssValue = (mapper && mapper[variant]) || variant;
        return _a = {},
            _a[property] = cssValue,
            _a;
    }
    var result = {};
    try {
        for (var _d = __values(Object.entries(variant)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var _f = __read(_e.value, 2), key = _f[0], value = _f[1];
            var cssValue = (mapper && value && mapper[value]) || value;
            if (key === '@initial') {
                result[property] = cssValue;
            }
            else {
                result[key] = (_c = {},
                    _c[property] = cssValue,
                    _c);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
Inline.displayName = 'Inline';

var PlaceholderElem = styled('div', {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 0,
    backgroundColor: 'rgba(30, 144, 255, 1)',
    border: '1px solid rgba(0, 50, 100, 0.5)',
    overflow: 'hidden',
    boxSizing: 'border-box',
    '& p': {
        margin: 0,
        padding: '4px 8px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        fontFamily: 'Courier, monospace',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '20px',
        boxSizing: 'border-box',
    },
    '& svg': {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    '& svg line': {
        strokeWidth: '1px',
        stroke: 'rgba(0, 50, 100, 0.2)',
    },
});
var Placeholder = function (_a) {
    var _b = _a.width, width = _b === void 0 ? 'auto' : _b, _c = _a.height, height = _c === void 0 ? '120px' : _c, label = _a.label;
    return (React__default["default"].createElement(PlaceholderElem, { css: {
            width: width,
            height: height,
        } }, label ? (React__default["default"].createElement(Box, { as: "p" }, label)) : (React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg" },
        React__default["default"].createElement("line", { x1: "0", y1: "0", x2: "100%", y2: "100%" }),
        React__default["default"].createElement("line", { x1: "100%", y1: "0", x2: "0", y2: "100%" })))));
};
Placeholder.displayName = 'Placeholder';

function ratioStyles(ratio) {
    var paddingBottom = ratio ? "".concat((1 / ratio || 0.5) * 100, "%") : '56.25%';
    return {
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: 0,
        '&::after': {
            content: '""',
            display: 'block',
            height: 0,
            paddingBottom: paddingBottom,
        },
        '& > *': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
    };
}
var Ratio = React.forwardRef(function (_a, forwardedRef) {
    var ratio = _a.ratio, children = _a.children, props = __rest(_a, ["ratio", "children"]);
    var styles = ratioStyles(ratio);
    return (React__default["default"].createElement(Box, __assign({}, props, { css: styles, ref: forwardedRef }), children));
});
Ratio.displayName = 'Ratio';

var Divider = function (_a) {
    var color = _a.color;
    return (React__default["default"].createElement(Box, { css: {
            position: 'relative',
        } },
        React__default["default"].createElement(Box, { css: {
                position: 'absolute',
                width: '100%',
                height: '1px',
                backgroundColor: color,
            } })));
};

var StackElem = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    minWidth: 0,
    variants: {
        align: {
            center: {
                alignItems: 'center',
            },
            left: {
                alignItems: 'flex-start',
            },
            right: {
                alignItems: 'flex-end',
            },
        },
    },
});
var Stack = React.forwardRef(function (_a, forwardedRef) {
    var space = _a.space, align = _a.align, dividers = _a.dividers, children = _a.children, props = __rest(_a, ["space", "align", "dividers", "children"]);
    var stackItems = flattenChildren__default["default"](children);
    var stackCount = stackItems.length;
    return (React__default["default"].createElement(StackElem, __assign({}, props, { ref: forwardedRef, align: align }), stackItems.map(function (child, index) {
        return child !== null && child !== undefined ? (React__default["default"].createElement(Box, { key: index, paddingBottom: index !== stackCount - 1 ? space : 0 },
            dividers && index > 0 ? (React__default["default"].createElement(Box, { paddingBottom: space, css: {
                    width: '100%',
                } },
                React__default["default"].createElement(Divider, { color: dividers }))) : null,
            child)) : null;
    })));
});
Stack.displayName = 'Stack';

var TileBox = styled(Box, {
    variants: {
        columns: {
            1: {
                flex: "0 0 100%",
            },
            2: {
                flex: "0 0 50%",
            },
            3: {
                flex: "0 0 33.33%",
            },
            4: {
                flex: "0 0 25%",
            },
            5: {
                flex: "0 0 20%",
            },
            6: {
                flex: "0 0 16.66%",
            },
            7: {
                flex: "0 0 14.28%",
            },
            8: {
                flex: "0 0 12.5%",
            },
            9: {
                flex: "0 0 11.11%",
            },
        },
    },
});
var Tiles = React.forwardRef(function (_a, forwardedRef) {
    var space = _a.space, _b = _a.columns, columns = _b === void 0 ? 1 : _b, children = _a.children, props = __rest(_a, ["space", "columns", "children"]);
    var negativeSpace = spaceToNegativeSpace(space);
    return (React__default["default"].createElement(Box, { marginTop: negativeSpace },
        React__default["default"].createElement(Box, __assign({}, props, { css: {
                display: 'flex',
                flexWrap: 'wrap',
            }, marginLeft: negativeSpace, ref: forwardedRef }), React.Children.map(flattenChildren__default["default"](children), function (child) {
            return child !== null && child !== undefined ? (React__default["default"].createElement(TileBox, { columns: columns, paddingLeft: space, paddingTop: space }, child)) : null;
        }))));
});
Tiles.displayName = 'Tiles';

exports.Bleed = Bleed;
exports.Box = Box;
exports.Column = Column;
exports.Columns = Columns;
exports.Flex = Flex;
exports.Grid = Grid;
exports.Inline = Inline;
exports.Placeholder = Placeholder;
exports.Ratio = Ratio;
exports.Stack = Stack;
exports.Tiles = Tiles;
exports.config = config;
exports.createTheme = createTheme;
exports.css = css;
exports.getCssText = getCssText;
exports.globalCss = globalCss;
exports.keyframes = keyframes;
exports.styled = styled;
exports.theme = theme;
