import React from 'react';
import { Text, TextVariants } from '@patternfly/react-core';

interface CustomTextProps {
  children: React.ReactNode;
  emphasis?: boolean;
  variant?: TextVariants;
}

/**
 * Custom wrapper that adds organization-specific behavior.
 * The internal implementation should migrate to Content,
 * but the wrapper name (CustomText) should stay the same.
 */
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  emphasis = false,
  variant = TextVariants.p
}) => {
  return (
    <Text
      component={variant}
      className={emphasis ? 'custom-emphasis' : ''}
    >
      {children}
    </Text>
  );
};

// Example usage in consuming code
export const ConsumerComponent: React.FC = () => {
  return (
    <div>
      <CustomText emphasis>Important text</CustomText>
      <CustomText variant={TextVariants.h3}>Heading</CustomText>
    </div>
  );
};
