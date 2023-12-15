'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('@stitches/react');
var React = require('react');
var flattenChildren = require('react-keyed-flatten-children');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var flattenChildren__default = /*#__PURE__*/_interopDefaultLegacy(flattenChildren);

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _createStitches = react.createStitches({
  media: {
    bp1: '(min-width: 450px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1170px)',
    bp4: '(min-width: 1440px)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)'
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
      full: '100%'
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px'
    }
  },
  utils: {
    // Abbreviated margin properties
    m: function m(value) {
      return {
        margin: value
      };
    },
    mt: function mt(value) {
      return {
        marginTop: value
      };
    },
    mr: function mr(value) {
      return {
        marginRight: value
      };
    },
    mb: function mb(value) {
      return {
        marginBottom: value
      };
    },
    ml: function ml(value) {
      return {
        marginLeft: value
      };
    },
    mx: function mx(value) {
      return {
        marginLeft: value,
        marginRight: value
      };
    },
    my: function my(value) {
      return {
        marginTop: value,
        marginBottom: value
      };
    },
    // Abbreviated padding properties
    p: function p(value) {
      return {
        padding: value
      };
    },
    pt: function pt(value) {
      return {
        paddingTop: value
      };
    },
    pr: function pr(value) {
      return {
        paddingRight: value
      };
    },
    pb: function pb(value) {
      return {
        paddingBottom: value
      };
    },
    pl: function pl(value) {
      return {
        paddingLeft: value
      };
    },
    px: function px(value) {
      return {
        paddingLeft: value,
        paddingRight: value
      };
    },
    py: function py(value) {
      return {
        paddingTop: value,
        paddingBottom: value
      };
    },
    // Abbreviated misc properties
    bg: function bg(value) {
      return {
        background: value
      };
    },
    br: function br(value) {
      return {
        borderRadius: value
      };
    },
    ta: function ta(value) {
      return {
        textAlign: value
      };
    },
    fd: function fd(value) {
      return {
        flexDirection: value
      };
    },
    fw: function fw(value) {
      return {
        flexWrap: value
      };
    },
    ai: function ai(value) {
      return {
        alignItems: value
      };
    },
    ac: function ac(value) {
      return {
        alignContent: value
      };
    },
    jc: function jc(value) {
      return {
        justifyContent: value
      };
    },
    as: function as(value) {
      return {
        alignSelf: value
      };
    },
    fg: function fg(value) {
      return {
        flexGrow: value
      };
    },
    fs: function fs(value) {
      return {
        flexShrink: value
      };
    },
    fb: function fb(value) {
      return {
        flexBasis: value
      };
    },
    bc: function bc(value) {
      return {
        backgroundColor: value
      };
    },
    btrr: function btrr(value) {
      return {
        borderTopRightRadius: value
      };
    },
    bbrr: function bbrr(value) {
      return {
        borderBottomRightRadius: value
      };
    },
    bblr: function bblr(value) {
      return {
        borderBottomLeftRadius: value
      };
    },
    btlr: function btlr(value) {
      return {
        borderTopLeftRadius: value
      };
    },
    bs: function bs(value) {
      return {
        boxShadow: value
      };
    },
    lh: function lh(value) {
      return {
        lineHeight: value
      };
    },
    ox: function ox(value) {
      return {
        overflowX: value
      };
    },
    oy: function oy(value) {
      return {
        overflowY: value
      };
    },
    pe: function pe(value) {
      return {
        pointerEvents: value
      };
    },
    us: function us(value) {
      return {
        WebkitUserSelect: value,
        userSelect: value
      };
    },
    userSelect: function userSelect(value) {
      return {
        WebkitUserSelect: value,
        userSelect: value
      };
    },
    size: function size(value) {
      return {
        width: value,
        height: value
      };
    },
    appearance: function appearance(value) {
      return {
        WebkitAppearance: value,
        appearance: value
      };
    },
    backgroundClip: function backgroundClip(value) {
      return {
        WebkitBackgroundClip: value,
        backgroundClip: value
      };
    },
    // Clamp a line of text to a certain number of rows
    lineClamp: function lineClamp(value) {
      return {
        display: '-webkit-box',
        WebkitLineClamp: value,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      };
    },
    // Truncate a line of text with an ellipsis
    truncate: function truncate(value) {
      return value ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      } : '';
    }
  }
}),
    styled = _createStitches.styled,
    css = _createStitches.css,
    globalCss = _createStitches.globalCss,
    keyframes = _createStitches.keyframes,
    getCssText = _createStitches.getCssText,
    theme = _createStitches.theme,
    createTheme = _createStitches.createTheme,
    config = _createStitches.config; // https://github.com/stitchesjs/stitches/issues/314#issuecomment-1028768285
var tokenVariants = function tokenVariants(config) {
  return Object.entries(theme[config.token]).reduce(function (previousValue, _ref) {
    var _extends2;

    var key = _ref[0],
        value = _ref[1];
    return _extends({}, previousValue, (_extends2 = {}, _extends2[key] = config.css(value), _extends2));
  }, {});
};

var Box = styled('div', {
  minWidth: 0,
  boxSizing: 'border-box',
  variants: {
    display: {
      none: {
        display: 'none'
      },
      inline: {
        display: 'inline'
      },
      block: {
        display: 'block'
      },
      contents: {
        display: 'contents'
      },
      'list-item': {
        display: 'list-item'
      },
      'inline-block': {
        display: 'inline-block'
      },
      'inline-table': {
        display: 'inline-table'
      },
      table: {
        display: 'table'
      },
      'table-cell': {
        display: 'table-cell'
      },
      'table-column': {
        display: 'table-column'
      },
      'table-column-group': {
        display: 'table-column-group'
      },
      'table-footer-group': {
        display: 'table-footer-group'
      },
      'table-header-group': {
        display: 'table-header-group'
      },
      'table-row': {
        display: 'table-row'
      },
      'table-row-group': {
        display: 'table-row-group'
      },
      flex: {
        display: 'flex'
      },
      'inline-flex': {
        display: 'inline-flex'
      },
      grid: {
        display: 'grid'
      },
      'inline-grid': {
        display: 'inline-grid'
      },
      inherit: {
        display: 'inherit'
      },
      initial: {
        display: 'initial'
      },
      unset: {
        display: 'unset'
      }
    },
    borderRadius: tokenVariants({
      token: 'radii',
      css: function css(value) {
        return {
          borderRadius: value
        };
      }
    }),
    m: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          m: value
        };
      }
    }),
    margin: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          m: value
        };
      }
    }),
    mx: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mx: value
        };
      }
    }),
    marginX: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mx: value
        };
      }
    }),
    my: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          my: value
        };
      }
    }),
    marginY: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          my: value
        };
      }
    }),
    ml: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          ml: value
        };
      }
    }),
    marginLeft: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          ml: value
        };
      }
    }),
    mr: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mr: value
        };
      }
    }),
    marginRight: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mr: value
        };
      }
    }),
    mt: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mt: value
        };
      }
    }),
    marginTop: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mt: value
        };
      }
    }),
    mb: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mb: value
        };
      }
    }),
    marginBottom: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          mb: value
        };
      }
    }),
    p: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          p: value
        };
      }
    }),
    padding: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          p: value
        };
      }
    }),
    px: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          px: value
        };
      }
    }),
    paddingX: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          px: value
        };
      }
    }),
    py: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          py: value
        };
      }
    }),
    paddingY: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          py: value
        };
      }
    }),
    pl: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pl: value
        };
      }
    }),
    paddingLeft: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pl: value
        };
      }
    }),
    pr: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pr: value
        };
      }
    }),
    paddingRight: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pr: value
        };
      }
    }),
    pt: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pt: value
        };
      }
    }),
    paddingTop: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pt: value
        };
      }
    }),
    pb: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pb: value
        };
      }
    }),
    paddingBottom: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          pb: value
        };
      }
    })
  }
});
Box.displayName = 'Box';

var breakpoints = ['initial'].concat(Object.keys(config.media));
function spaceToNegativeSpace(space) {
  if (!space) return undefined;
  if (typeof space === 'string' || typeof space === 'number') return -("" + space);else {
    var resp = {};

    for (var _i = 0, _Object$entries = Object.entries(space); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];
      resp[key] = value ? -("" + value) : undefined;
    }

    return resp;
  }
}
function sliceSpace(space, maxBreakpoint) {
  if (!space || !maxBreakpoint) return undefined;
  var result = {};
  var maxIndex = breakpoints.indexOf(maxBreakpoint);

  for (var _iterator = _createForOfIteratorHelperLoose(breakpoints.entries()), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        index = _step$value[0],
        breakpoint = _step$value[1];
    var bp = "@" + breakpoint;

    if (index < maxIndex) {
      if (typeof space === 'number' || typeof space === 'string') {
        result[bp] = space;
      } else {
        result[bp] = space[bp];
      }
    } else if (index === maxIndex) {
      result[bp] = 0;
    }
  }

  return result;
}

var Bleed = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var space = _ref.space,
      horizontal = _ref.horizontal,
      vertical = _ref.vertical,
      top = _ref.top,
      bottom = _ref.bottom,
      left = _ref.left,
      right = _ref.right,
      _ref$as = _ref.as,
      as = _ref$as === void 0 ? 'div' : _ref$as,
      children = _ref.children;
  var mt = spaceToNegativeSpace(top || vertical || space);
  var mb = spaceToNegativeSpace(bottom || vertical || space);
  var ml = spaceToNegativeSpace(left || horizontal || space);
  var mr = spaceToNegativeSpace(right || horizontal || space);
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    ref: ref,
    as: as,
    display: as === 'span' ? 'block' : undefined,
    mt: mt,
    mb: mb,
    ml: ml,
    mr: mr
  }, /*#__PURE__*/React__default["default"].createElement(Box, {
    display: as === 'span' ? 'block' : undefined,
    css: {
      position: 'relative'
    }
  }, children));
});
Bleed.displayName = 'Bleed';

var ColumnContext = /*#__PURE__*/React.createContext({});
var mapToFlex = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  top: 'flex-start',
  bottom: 'flex-end'
};
var Columns = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref2;

  var space = _ref.space,
      alignX = _ref.alignX,
      alignY = _ref.alignY,
      collapse = _ref.collapse,
      children = _ref.children;
  var justifyContent = alignX ? mapToFlex[alignX] : undefined;
  var alignItems = alignY ? mapToFlex[alignY] : undefined;
  var negativeSpace = spaceToNegativeSpace(space);
  var collapseStyle = collapse ? (_ref2 = {
    flexDirection: 'column'
  }, _ref2["@" + collapse] = {
    flexDirection: 'row'
  }, _ref2) : {
    flexDirection: 'row'
  };
  var paddingTop = sliceSpace(space, collapse);
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    ref: ref,
    marginLeft: negativeSpace,
    css: _extends({
      display: 'flex',
      alignItems: alignItems,
      justifyContent: justifyContent
    }, collapseStyle)
  }, /*#__PURE__*/React__default["default"].createElement(ColumnContext.Provider, {
    value: {
      paddingLeft: space,
      paddingTop: paddingTop
    }
  }, children));
});
Columns.displayName = 'Columns';

var ColumnBox = styled(Box, {
  '&:first-of-type > *': {
    paddingTop: 0
  }
});
var Column = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var width = _ref.width,
      children = _ref.children;

  var _useContext = React.useContext(ColumnContext),
      paddingLeft = _useContext.paddingLeft,
      paddingTop = _useContext.paddingTop;

  return /*#__PURE__*/React__default["default"].createElement(ColumnBox, {
    ref: ref,
    css: {
      width: width !== 'content' ? '100%' : undefined,
      flexShrink: width === 'content' ? 0 : undefined,
      flex: typeof width === 'number' ? "0 0 " + +width * 100 + "%" : width === 'content' ? undefined : 1
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box, {
    paddingLeft: paddingLeft,
    paddingTop: paddingTop,
    css: {
      height: '100%'
    }
  }, children));
});
Column.displayName = 'Column';

var Flex = styled('div', {
  display: 'flex',
  minWidth: 0,
  boxSizing: 'border-box',
  variants: {
    direction: {
      row: {
        flexDirection: 'row'
      },
      column: {
        flexDirection: 'column'
      },
      rowReverse: {
        flexDirection: 'row-reverse'
      },
      columnReverse: {
        flexDirection: 'column-reverse'
      }
    },
    align: {
      start: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'flex-end'
      },
      stretch: {
        alignItems: 'stretch'
      },
      baseline: {
        alignItems: 'baseline'
      }
    },
    justify: {
      start: {
        justifyContent: 'flex-start'
      },
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'flex-end'
      },
      between: {
        justifyContent: 'space-between'
      },
      around: {
        justifyContent: 'space-around'
      },
      evenly: {
        justifyContent: 'space-evenly'
      }
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap'
      },
      wrap: {
        flexWrap: 'wrap'
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse'
      }
    },
    gap: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          gap: value
        };
      }
    })
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap'
  }
});

var Grid = styled('div', {
  display: 'grid',
  minWidth: 0,
  boxSizing: 'border-box',
  variants: {
    align: {
      start: {
        alignItems: 'start'
      },
      center: {
        alignItems: 'center'
      },
      end: {
        alignItems: 'end'
      },
      stretch: {
        alignItems: 'stretch'
      },
      baseline: {
        alignItems: 'baseline'
      }
    },
    justify: {
      start: {
        justifyContent: 'start'
      },
      center: {
        justifyContent: 'center'
      },
      end: {
        justifyContent: 'end'
      },
      between: {
        justifyContent: 'space-between'
      }
    },
    flow: {
      row: {
        gridAutoFlow: 'row'
      },
      column: {
        gridAutoFlow: 'column'
      },
      dense: {
        gridAutoFlow: 'dense'
      },
      rowDense: {
        gridAutoFlow: 'row dense'
      },
      columnDense: {
        gridAutoFlow: 'column dense'
      }
    },
    columns: {
      1: {
        gridTemplateColumns: 'repeat(1, 1fr)'
      },
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)'
      },
      3: {
        gridTemplateColumns: 'repeat(3, 1fr)'
      },
      4: {
        gridTemplateColumns: 'repeat(4, 1fr)'
      }
    },
    gap: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          gap: value
        };
      }
    }),
    gapX: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          columnGap: value
        };
      }
    }),
    gapY: tokenVariants({
      token: 'space',
      css: function css(value) {
        return {
          rowGap: value
        };
      }
    })
  }
});

var Inliner = styled(Box, {
  display: 'flex',
  flexWrap: 'wrap',
  variants: {
    alignX: {
      left: {
        justifyContent: 'flex-start'
      },
      center: {
        justifyContent: 'center'
      },
      right: {
        justifyContent: 'flex-end'
      }
    },
    alignY: {
      top: {
        alignItems: 'flex-start'
      },
      center: {
        alignItems: 'center'
      },
      bottom: {
        alignItems: 'flex-end'
      }
    }
  }
});
var Inline = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref2, _ref3;

  var space = _ref.space,
      alignX = _ref.alignX,
      alignY = _ref.alignY,
      collapse = _ref.collapse,
      children = _ref.children;
  var negativeSpace = spaceToNegativeSpace(space);
  var display = collapse ? (_ref2 = {
    '@initial': 'flex'
  }, _ref2["@" + collapse] = 'block', _ref2) : 'block';
  var inlinerStyles = collapse ? (_ref3 = {
    flexDirection: 'column'
  }, _ref3["@" + collapse] = {
    flexDirection: 'row'
  }, _ref3) : {
    flexDirection: 'row'
  };
  var childStyles = variantToCss('justifyContent', alignX, {
    left: 'flex-start',
    right: 'flex-end'
  });
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    marginTop: negativeSpace
  }, /*#__PURE__*/React__default["default"].createElement(Inliner, {
    marginLeft: negativeSpace,
    alignX: alignX,
    alignY: alignY,
    css: inlinerStyles,
    ref: ref
  }, React.Children.map(flattenChildren__default["default"](children), function (child) {
    return child !== null && child !== undefined ? /*#__PURE__*/React__default["default"].createElement(Box, {
      display: display,
      paddingLeft: space,
      paddingTop: space,
      css: childStyles
    }, child) : null;
  })));
});
function variantToCss(property, variant, mapper) {
  if (!variant) return undefined;

  if (typeof variant === 'string') {
    var _ref4;

    var cssValue = mapper && mapper[variant] || variant;
    return _ref4 = {}, _ref4[property] = cssValue, _ref4;
  }

  var result = {};

  for (var _i = 0, _Object$entries = Object.entries(variant); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _Object$entries[_i],
        _key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    var _cssValue = mapper && value && mapper[value] || value;

    if (_key === '@initial') {
      result[property] = _cssValue;
    } else {
      var _result$_key;

      result[_key] = (_result$_key = {}, _result$_key[property] = _cssValue, _result$_key);
    }
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
  background: '#E6E6DE',
  border: '1px solid rgba(73, 96, 66, 0.8)',
  overflow: 'hidden',
  boxSizing: 'border-box',
  '& p': {
    margin: 0,
    padding: '4px 8px',
    textAlign: 'center',
    color: 'rgba(73, 96, 66, 0.8)',
    fontFamily: 'Courier, monospace',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    boxSizing: 'border-box'
  },
  '& svg': {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  '& svg line': {
    strokeWidth: '1px',
    stroke: 'rgba(73, 96, 66, 0.2)'
  }
});

var Placeholder = function Placeholder(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 'auto' : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '120px' : _ref$height,
      label = _ref.label;
  return /*#__PURE__*/React__default["default"].createElement(PlaceholderElem, {
    css: {
      width: width,
      height: height
    }
  }, label ? /*#__PURE__*/React__default["default"].createElement(Box, {
    as: "p"
  }, label) : /*#__PURE__*/React__default["default"].createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default["default"].createElement("line", {
    x1: "0",
    y1: "0",
    x2: "100%",
    y2: "100%"
  }), /*#__PURE__*/React__default["default"].createElement("line", {
    x1: "100%",
    y1: "0",
    x2: "0",
    y2: "100%"
  })));
};

Placeholder.displayName = 'Placeholder';

function ratioStyles(ratio) {
  var paddingBottom = ratio ? (1 / ratio || 0.5) * 100 + "%" : '56.25%';
  return {
    position: 'relative',
    boxSizing: 'border-box',
    minWidth: 0,
    '&::after': {
      content: '""',
      display: 'block',
      height: 0,
      paddingBottom: paddingBottom
    },
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    }
  };
}

function Ratio(_ref) {
  var ratio = _ref.ratio,
      children = _ref.children;
  var styles = ratioStyles(ratio);
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    css: styles
  }, children);
}

Ratio.displayName = 'Ratio';

var Divider = function Divider(_ref) {
  var color = _ref.color;
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    css: {
      position: 'relative'
    }
  }, /*#__PURE__*/React__default["default"].createElement(Box, {
    css: {
      position: 'absolute',
      width: '100%',
      height: '1px',
      backgroundColor: color
    }
  }));
};

var StackElem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  minWidth: 0,
  variants: {
    align: {
      center: {
        alignItems: 'center'
      },
      left: {
        alignItems: 'flex-start'
      },
      right: {
        alignItems: 'flex-end'
      }
    }
  }
});

function Stack(_ref) {
  var space = _ref.space,
      align = _ref.align,
      dividers = _ref.dividers,
      children = _ref.children;
  var stackItems = flattenChildren__default["default"](children);
  var stackCount = stackItems.length;
  return /*#__PURE__*/React__default["default"].createElement(StackElem, {
    align: align
  }, stackItems.map(function (child, index) {
    return child !== null && child !== undefined ? /*#__PURE__*/React__default["default"].createElement(Box, {
      key: index,
      paddingBottom: index !== stackCount - 1 ? space : 0
    }, dividers && index > 0 ? /*#__PURE__*/React__default["default"].createElement(Box, {
      paddingBottom: space,
      css: {
        width: '100%'
      }
    }, /*#__PURE__*/React__default["default"].createElement(Divider, {
      color: dividers
    })) : null, child) : null;
  }));
}

Stack.displayName = 'Stack';

var TileBox = styled(Box, {
  variants: {
    columns: {
      1: {
        flex: "0 0 100%"
      },
      2: {
        flex: "0 0 50%"
      },
      3: {
        flex: "0 0 33.33%"
      },
      4: {
        flex: "0 0 25%"
      },
      5: {
        flex: "0 0 20%"
      },
      6: {
        flex: "0 0 16.66%"
      },
      7: {
        flex: "0 0 14.28%"
      },
      8: {
        flex: "0 0 12.5%"
      },
      9: {
        flex: "0 0 11.11%"
      }
    }
  }
});
var Tiles = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var space = _ref.space,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? 1 : _ref$columns,
      children = _ref.children;
  var negativeSpace = spaceToNegativeSpace(space);
  return /*#__PURE__*/React__default["default"].createElement(Box, {
    marginTop: negativeSpace
  }, /*#__PURE__*/React__default["default"].createElement(Box, {
    css: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    marginLeft: negativeSpace,
    ref: ref
  }, React.Children.map(flattenChildren__default["default"](children), function (child) {
    return child !== null && child !== undefined ? /*#__PURE__*/React__default["default"].createElement(TileBox, {
      columns: columns,
      paddingLeft: space,
      paddingTop: space
    }, child) : null;
  })));
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
//# sourceMappingURL=index.js.map
