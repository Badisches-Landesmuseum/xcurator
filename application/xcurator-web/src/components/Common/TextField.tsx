import * as React from 'react';
import { Box, styled } from '@3pc/layout-components-react';
import { PlusIcon } from 'src/icons/PlusIcon';
import { theme } from 'src/themes/theme';

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      icon,
      id,
      value,
      type = 'text',
      onChange,
      onBlur,
      onFocus,
      onClear,
      ...props
    },
    ref
  ) => {
    const fallbackId = React.useId();
    const inputId = id || fallbackId;
    const defaultRef = React.useRef<HTMLInputElement | null>(null);
    const inputRef = ref || defaultRef;
    const clearable = Boolean(
      typeof onClear !== 'undefined' &&
        typeof value === 'string' &&
        value.length > 0
    );

    return (
      <Box
        css={{
          position: 'relative',
        }}
      >
        <StyledInput
          as="input"
          type={validTypes[type]}
          id={inputId}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          clearable={clearable}
          icon={Boolean(icon)}
          {...props}
          ref={inputRef}
        />
        {label ? (
          <VisuallyHidden>
            <label htmlFor={inputId}>{label}</label>
          </VisuallyHidden>
        ) : null}
        {icon ? (
          <IconBox>
            {React.cloneElement(icon, {
              color: theme.colors.black600,
              width: 16,
              height: 16,
            })}
          </IconBox>
        ) : null}
        {onClear ? (
          <ClearField hide={!clearable} onClear={onClear} inputRef={inputRef} />
        ) : null}
      </Box>
    );
  }
);

const ClearField = ({
  hide = false,
  onClear,
  inputRef,
}: {
  hide?: boolean;
  onClear?: () => void;
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | React.MutableRefObject<HTMLInputElement | null>;
}) => {
  const clearHandler = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (typeof onClear !== 'function' || event.button !== 0) {
        return;
      }

      onClear();

      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [onClear, inputRef]
  );

  return (
    <ClearButtonBox hide={hide} onMouseDown={clearHandler} tabIndex={-1}>
      <PlusIcon width="12px" height="12px" />
    </ClearButtonBox>
  );
};

const StyledInput = styled(Box, {
  display: 'block',
  width: '100%',
  p: '4px 12px',
  fontFamily: '$text',
  fontSize: '$large',
  fontWeight: '$bold',
  border: '2px solid',
  borderColor: 'transparent',
  lineHeight: 'inherit',
  color: 'black',
  caretColor: '$black600',
  appearance: 'none',
  outline: '1px solid $blue',

  variants: {
    clearable: {
      true: {
        paddingRight: '32px',
      },
    },
    kiFeedback: {
      true: {
        borderColor: '$red',
      },
    },
    icon: {
      true: {
        paddingLeft: '32px',
      },
    },
  },

  '&:disabled': {
    color: '$black600',
  },

  '&::placeholder': {
    color: '$black600',
    opacity: 1,
  },

  '+ div svg > *': {
    transitionProperty: 'stroke',
    transitionDuration: '150ms',
    transitionTimingFunction: '$easings$out',
  },

  '&:not(:disabled):hover': {
    borderColor: '$blue',
  },

  '&:not(:disabled):focus, &:not(:disabled):active': {
    outline: 'none',
    borderColor: '$blue',
  },

  '&:focus-visible': {
    borderColor: '$blue',
  },
});

const VisuallyHidden = styled('div', {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  border: 0,
});

const IconBox = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '32px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
});

const ClearButtonBox = styled('button', {
  all: 'unset',
  position: 'absolute',
  top: '0',
  right: '0',
  height: '100%',
  width: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.5,
  transition: 'opacity 150ms',

  '&:hover': {
    opacity: 1,
  },

  variants: {
    hide: {
      true: {
        pointerEvents: 'none',
        opacity: 0,
      },
    },
  },
  svg: {
    transform: 'rotate(45deg)',
  },
});

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const validTypes = {
  text: 'text',
  password: 'password',
  email: 'email',
  search: 'search',
  number: 'number',
  tel: 'tel',
  url: 'url',
};

export type TextFieldProps = React.ComponentPropsWithoutRef<'input'> & {
  id?: NonNullable<InputProps['id']>;
  label?: string;
  type?: keyof typeof validTypes;
  required?: boolean;
  disabled?: InputProps['disabled'];
  value?: NonNullable<InputProps['value']>;
  name?: InputProps['name'];
  autoComplete?: InputProps['autoComplete'];
  'aria-describedby'?: InputProps['aria-describedby'];
  autoFocus?: boolean;
  icon?: React.ReactElement;
  onChange?: NonNullable<InputProps['onChange']>;
  onBlur?: InputProps['onBlur'];
  onFocus?: InputProps['onFocus'];
  onClear?: () => void;
  placeholder?: InputProps['placeholder'];
};

TextField.displayName = 'TextField';
export { TextField };
