"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _color = _interopRequireDefault(require("color"));

var _InputLabel = _interopRequireDefault(require("./Label/InputLabel"));

var _TextInputAdornment = _interopRequireWildcard(require("./Adornment/TextInputAdornment"));

var _constants = require("./constants");

var _helpers = require("./helpers");

var _enums = require("./Adornment/enums");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MINIMIZED_LABEL_Y_OFFSET = -18;
const LABEL_PADDING_TOP = 30;
const LABEL_PADDING_TOP_DENSE = 24;
const MIN_HEIGHT = 64;
const MIN_DENSE_HEIGHT_WL = 52;
const MIN_DENSE_HEIGHT = 40;

const TextInputFlat = _ref => {
  let {
    disabled = false,
    editable = true,
    label,
    error = false,
    selectionColor,
    underlineColor,
    activeUnderlineColor,
    dense,
    style,
    theme,
    render = props => /*#__PURE__*/React.createElement(_reactNative.TextInput, props),
    multiline = false,
    parentState,
    innerRef,
    onFocus,
    forceFocus,
    onBlur,
    onChangeText,
    onLayoutAnimatedText,
    onLeftAffixLayoutChange,
    onRightAffixLayoutChange,
    left,
    right,
    placeholderTextColor,
    ...rest
  } = _ref;
  const isAndroid = _reactNative.Platform.OS === 'android';
  const {
    colors,
    fonts
  } = theme;
  const font = fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const {
    fontSize: fontSizeStyle,
    fontWeight,
    fontVariant,
    height,
    paddingHorizontal,
    textAlign,
    ...viewStyle
  } = _reactNative.StyleSheet.flatten(style) || {};
  const fontSize = fontSizeStyle || _constants.MAXIMIZED_LABEL_FONT_SIZE;
  const isPaddingHorizontalPassed = paddingHorizontal !== undefined && typeof paddingHorizontal === 'number';
  const adornmentConfig = (0, _TextInputAdornment.getAdornmentConfig)({
    left,
    right
  });
  let {
    paddingLeft,
    paddingRight
  } = (0, _helpers.calculateFlatInputHorizontalPadding)({
    adornmentConfig
  });

  if (isPaddingHorizontalPassed) {
    paddingLeft = paddingHorizontal;
    paddingRight = paddingHorizontal;
  }

  const {
    leftLayout,
    rightLayout
  } = parentState;
  const rightAffixWidth = right ? rightLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const leftAffixWidth = left ? leftLayout.width || _constants.ADORNMENT_SIZE : _constants.ADORNMENT_SIZE;
  const adornmentStyleAdjustmentForNativeInput = (0, _TextInputAdornment.getAdornmentStyleAdjustmentForNativeInput)({
    adornmentConfig,
    rightAffixWidth,
    leftAffixWidth,
    paddingHorizontal,
    inputOffset: _constants.FLAT_INPUT_OFFSET,
    mode: _enums.InputMode.Flat
  });
  let inputTextColor, activeColor, underlineColorCustom, placeholderColor, errorColor;

  if (disabled) {
    inputTextColor = activeColor = (0, _color.default)(colors.text).alpha(0.54).rgb().string();
    placeholderColor = colors.disabled;
    underlineColorCustom = 'transparent';
  } else {
    inputTextColor = colors.text;
    activeColor = error ? colors.error : activeUnderlineColor || colors.primary;
    placeholderColor = colors.placeholder;
    errorColor = colors.error;
    underlineColorCustom = underlineColor || colors.disabled;
  }

  const containerStyle = {
    backgroundColor: theme.dark ? (0, _color.default)(colors.background).lighten(0.24).rgb().string() : (0, _color.default)(colors.background).darken(0.06).rgb().string(),
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness
  };
  const labelScale = _constants.MINIMIZED_LABEL_FONT_SIZE / fontSize;
  const fontScale = _constants.MAXIMIZED_LABEL_FONT_SIZE / fontSize;
  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;
  const baseLabelTranslateX = (_reactNative.I18nManager.isRTL ? 1 : -1) * (labelHalfWidth - labelScale * labelWidth / 2) + (1 - labelScale) * (_reactNative.I18nManager.isRTL ? -1 : 1) * paddingLeft;
  const minInputHeight = dense ? (label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT) - LABEL_PADDING_TOP_DENSE : MIN_HEIGHT - LABEL_PADDING_TOP;
  const inputHeight = (0, _helpers.calculateInputHeight)(labelHeight, height, minInputHeight);
  const topPosition = (0, _helpers.calculateLabelTopPosition)(labelHeight, inputHeight, multiline && height ? 0 : !height ? minInputHeight / 2 : 0);

  if (height && typeof height !== 'number') {
    // eslint-disable-next-line
    console.warn('Currently we support only numbers in height prop');
  }

  const paddingSettings = {
    height: height ? +height : null,
    labelHalfHeight,
    offset: _constants.FLAT_INPUT_OFFSET,
    multiline: multiline ? multiline : null,
    dense: dense ? dense : null,
    topPosition,
    fontSize,
    label,
    scale: fontScale,
    isAndroid,
    styles: _reactNative.StyleSheet.flatten(dense ? styles.inputFlatDense : styles.inputFlat)
  };
  const pad = (0, _helpers.calculatePadding)(paddingSettings);
  const paddingFlat = (0, _helpers.adjustPaddingFlat)({ ...paddingSettings,
    pad
  });
  const baseLabelTranslateY = -labelHalfHeight - (topPosition + MINIMIZED_LABEL_Y_OFFSET);
  const placeholderOpacity = hasActiveOutline ? (0, _helpers.interpolatePlaceholder)(parentState.labeled, hasActiveOutline) : parentState.labelLayout.measured ? 1 : 0;
  const minHeight = height || (dense ? label ? MIN_DENSE_HEIGHT_WL : MIN_DENSE_HEIGHT : MIN_HEIGHT);
  const flatHeight = inputHeight + (!height ? dense ? LABEL_PADDING_TOP_DENSE : LABEL_PADDING_TOP : 0);
  const iconTopPosition = (flatHeight - _constants.ADORNMENT_SIZE) / 2;
  const leftAffixTopPosition = leftLayout.height ? (0, _helpers.calculateFlatAffixTopPosition)({
    height: flatHeight,
    ...paddingFlat,
    affixHeight: leftLayout.height
  }) : null;
  const rightAffixTopPosition = rightLayout.height ? (0, _helpers.calculateFlatAffixTopPosition)({
    height: flatHeight,
    ...paddingFlat,
    affixHeight: rightLayout.height
  }) : null;
  const labelProps = {
    label,
    onLayoutAnimatedText,
    placeholderOpacity,
    error,
    placeholderStyle: styles.placeholder,
    baseLabelTranslateY,
    baseLabelTranslateX,
    font,
    fontSize,
    fontWeight,
    labelScale,
    wiggleOffsetX: _constants.LABEL_WIGGLE_X_OFFSET,
    topPosition,
    paddingOffset: isAndroid ? {
      paddingLeft: _reactNative.I18nManager.isRTL ? paddingRight : paddingLeft,
      paddingRight: _reactNative.I18nManager.isRTL ? paddingLeft : paddingRight
    } : {
      paddingRight,
      paddingLeft
    },
    hasActiveOutline,
    activeColor,
    placeholderColor,
    errorColor,
    roundness: theme.roundness,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  };
  const affixTopPosition = {
    [_enums.AdornmentSide.Left]: leftAffixTopPosition,
    [_enums.AdornmentSide.Right]: rightAffixTopPosition
  };
  const onAffixChange = {
    [_enums.AdornmentSide.Left]: onLeftAffixLayoutChange,
    [_enums.AdornmentSide.Right]: onRightAffixLayoutChange
  };
  let adornmentProps = {
    paddingHorizontal,
    adornmentConfig,
    forceFocus,
    topPosition: {
      [_enums.AdornmentType.Affix]: affixTopPosition,
      [_enums.AdornmentType.Icon]: iconTopPosition
    },
    onAffixChange,
    isTextInputFocused: parentState.focused,
    maxFontSizeMultiplier: rest.maxFontSizeMultiplier
  };

  if (adornmentConfig.length) {
    adornmentProps = { ...adornmentProps,
      left,
      right,
      textStyle: { ...font,
        fontSize,
        fontWeight
      },
      visible: parentState.labeled
    };
  }

  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [containerStyle, viewStyle]
  }, /*#__PURE__*/React.createElement(Underline, {
    parentState: parentState,
    underlineColorCustom: underlineColorCustom,
    error: error,
    colors: colors,
    activeColor: activeColor
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.labelContainer, {
      minHeight
    }]
  }, !isAndroid && multiline && !!label &&
  /*#__PURE__*/
  // Workaround for: https://github.com/callstack/react-native-paper/issues/2799
  // Patch for a multiline TextInput with fixed height, which allow to avoid covering input label with its value.
  React.createElement(_reactNative.View, {
    testID: "patch-container",
    pointerEvents: "none",
    style: [_reactNative.StyleSheet.absoluteFill, dense ? styles.densePatchContainer : styles.patchContainer, {
      backgroundColor: viewStyle.backgroundColor || containerStyle.backgroundColor,
      left: paddingLeft,
      right: paddingRight
    }]
  }), /*#__PURE__*/React.createElement(_InputLabel.default, {
    parentState: parentState,
    labelProps: labelProps
  }), render === null || render === void 0 ? void 0 : render({
    testID: 'text-input-flat',
    ...rest,
    ref: innerRef,
    onChangeText,
    placeholder: label ? parentState.placeholder : rest.placeholder,
    placeholderTextColor: placeholderTextColor !== null && placeholderTextColor !== void 0 ? placeholderTextColor : placeholderColor,
    editable: !disabled && editable,
    selectionColor: typeof selectionColor === 'undefined' ? activeColor : selectionColor,
    onFocus,
    onBlur,
    underlineColorAndroid: 'transparent',
    multiline,
    style: [styles.input, {
      paddingLeft,
      paddingRight
    }, !multiline || multiline && height ? {
      height: flatHeight
    } : {}, paddingFlat, { ...font,
      fontSize,
      fontWeight,
      fontVariant,
      color: inputTextColor,
      textAlignVertical: multiline ? 'top' : 'center',
      textAlign: textAlign ? textAlign : _reactNative.I18nManager.isRTL ? 'right' : 'left'
    }, _reactNative.Platform.OS === 'web' && {
      outline: 'none'
    }, adornmentStyleAdjustmentForNativeInput]
  })), /*#__PURE__*/React.createElement(_TextInputAdornment.default, adornmentProps));
};

var _default = TextInputFlat;
exports.default = _default;

const Underline = _ref2 => {
  let {
    parentState,
    error,
    colors,
    activeColor,
    underlineColorCustom
  } = _ref2;
  let backgroundColor = parentState.focused ? activeColor : underlineColorCustom;
  if (error) backgroundColor = colors.error;
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    style: [styles.underline, {
      backgroundColor,
      // Underlines is thinner when input is not focused
      transform: [{
        scaleY: parentState.focused ? 1 : 0.5
      }]
    }]
  });
};

const styles = _reactNative.StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    zIndex: 1
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0
  },
  input: {
    flexGrow: 1,
    margin: 0
  },
  inputFlat: {
    paddingTop: 24,
    paddingBottom: 4
  },
  inputFlatDense: {
    paddingTop: 22,
    paddingBottom: 2
  },
  patchContainer: {
    height: 24,
    zIndex: 2
  },
  densePatchContainer: {
    height: 22,
    zIndex: 2
  }
});
//# sourceMappingURL=TextInputFlat.js.map