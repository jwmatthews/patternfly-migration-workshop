import React from 'react';
import { Content } from '@patternfly/react-core';

interface CustomTextProps {
  children: React.ReactNode;
  emphasis?: boolean;
  component?: React.ElementType;
}

/**
 * Custom wrapper that adds organization-specific behavior.
 */
export const CustomText: React.FC<CustomTextProps> = ({
  children,
  emphasis = false,
  component = 'p'
}) => {
  return (
    <Content
      component={component}
      className={emphasis ? 'custom-emphasis' : ''}
    >
      {children}
    </Content>
  );
};

// Example usage in consuming code
export const ConsumerComponent: React.FC = () => {
  return (
    <div>
      <CustomText emphasis>Important text</CustomText>
      <CustomText component="h3">Heading</CustomText>
    </div>
  );
};
