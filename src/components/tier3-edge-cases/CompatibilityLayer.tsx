import React from 'react';
import { Text } from '@patternfly/react-core';

interface CompatibilityLayerProps {
  useModern: boolean;
  children: string;
}

/**
 * A compatibility wrapper component that supports different API versions.
 */
export const CompatibilityLayer: React.FC<CompatibilityLayerProps> = ({
  useModern,
  children
}) => {
  // Conditionally render based on version preference
  // Note: useModern parameter available for future implementation
  void useModern; // Acknowledge parameter to avoid unused variable warning
  return <Text component="p">{children}</Text>;
};
