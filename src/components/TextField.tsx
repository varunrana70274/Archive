import React, {
  ComponentType,
  forwardRef,
  Ref,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Colors, FontFamily } from '../libs/theme';
import {spacing} from '../theme/spacing';
import {Text, TextProps} from './Text';

export interface TextFieldAccessoryProps {
  style: StyleProp<any>;
  status: TextFieldProps['status'];
  multiline: boolean;
  editable: boolean;
}

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps['text'];
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps['tx'];
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps;
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps['text'];
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps['tx'];
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps['txOptions'];
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps;
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps['text'];
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps['tx'];
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps['txOptions'];
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>;
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>;
}

/**
 * A component that allows for the entering and editing of text.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-TextField.md)
 */
export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    ...textInputProps
  } = props;
  const input = useRef<TextInput>(null);

  const disabled = textInputProps.editable === false || status === 'disabled';

  const placeholderContent = placeholder;

  const $containerStyles = [$containerStyleOverride];

  const $labelStyles = [$labelStyle, LabelTextProps?.style];

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === 'error' && {borderColor: 'red'},
    textInputProps.multiline && {minHeight: 158},
    LeftAccessory && {paddingStart: 0},
    RightAccessory && {paddingEnd: 0},
    $inputWrapperStyleOverride,
  ];

  const $inputStyles = [
    $inputStyle,
    disabled && {color: 'gray'},
      {textAlign: 'right' as TextStyle['textAlign']},
    textInputProps.multiline && {height: 'auto' as TextStyle['height']},
    $inputStyleOverride,
  ];

  const $helperStyles = [
    $helperStyle,
    status === 'error' && {color: 'red'},
    HelperTextProps?.style,
  ];

  function focusInput() {
    if (disabled) {
      return;
    }

    input.current?.focus();
  }

  useImperativeHandle(ref, () => input.current!);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{disabled}}>
      {!!(label || labelTx) && (
        <Text
          preset="formLabel"
          text={label}
          tx={labelTx}
          txOptions={labelTxOptions}
          {...LabelTextProps}
          style={$labelStyles}
        />
      )}

      <View style={$inputWrapperStyles}>
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={textInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={'transparent'}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={'gray'}
          {...textInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={textInputProps.multiline ?? false}
          />
        )}
      </View>

      {!!(helper || helperTx) && (
        <Text
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </TouchableOpacity>
  );
});

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
};

const $inputWrapperStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderRadius: 6,
  backgroundColor: '#1B1E29',
  borderColor: '#5B76FA',
  overflow: 'hidden',
};

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: 'stretch',
  fontFamily: FontFamily.regular,
  color: 'white',
  fontSize: 16,
  height: 20,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.md + 1,
  marginHorizontal: spacing.md + 1,
};

const $helperStyle: TextStyle = {
  marginTop: spacing.xxxs,
};

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.md,
  height: 54,
  justifyContent: 'center',
  alignItems: 'center',
};
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.md,
  height: 54,
  justifyContent: 'center',
  alignItems: 'center',
};
