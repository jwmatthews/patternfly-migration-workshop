import React, { useState } from 'react';
import { Content } from '@patternfly/react-core';

interface DynamicComponentProps {
  componentType: 'alert' | 'card' | 'banner';
  status: 'info' | 'warning' | 'error';
}

/**
 * A component that dynamically renders content based on component type and status.
 */
export const DynamicComponent: React.FC<DynamicComponentProps> = ({
  componentType,
  status
}) => {
  // Dynamic CSS class construction
  const baseClass = `pf-v6-c-${componentType}`;
  const statusModifier = status === 'error' ? 'danger' : status;
  const statusClass = `pf-m-${statusModifier}`;

  // Dynamic content selection
  const [showDetails, setShowDetails] = useState(false);

  // Conditionally render content based on details state
  const renderContent = () => {
    if (showDetails) {
      return (
        <Content component="p">
          Detailed information for {componentType} with {status} status.
        </Content>
      );
    }
    return <Content component="small">Summary view</Content>;
  };

  return (
    <div className={`${baseClass} ${statusClass}`}>
      {renderContent()}
      <button onClick={() => setShowDetails(!showDetails)}>
        Toggle Details
      </button>
    </div>
  );
};

/**
 * Example usage of the dynamic component with different configurations.
 */
export const DynamicComponentExample: React.FC = () => {
  // These values could come from API, user input, database, etc.
  const configs = [
    { type: 'alert' as const, status: 'warning' as const },
    { type: 'card' as const, status: 'info' as const },
    { type: 'banner' as const, status: 'error' as const }
  ];

  return (
    <div>
      {configs.map((config, idx) => (
        <DynamicComponent
          key={idx}
          componentType={config.type}
          status={config.status}
        />
      ))}
    </div>
  );
};
