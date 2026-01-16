import React, { useState, useEffect } from 'react';

interface DynamicComponentProps {
  componentName: string;
}

/**
 * This component uses dynamic imports that AI cannot confidently modify.
 * The template literal in the import path makes automated refactoring risky.
 */
export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentName
}) => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    // Dynamic import that AI can't confidently modify
    import(`@patternfly/react-core/${componentName}`)
      .then((mod) => setComponent(() => mod[componentName]))
      .catch(console.error);
  }, [componentName]);

  if (!Component) return <div>Loading...</div>;

  return <Component />;
};
