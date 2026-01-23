import React, { useState } from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Button
} from '@patternfly/react-core';
import { SearchIcon, CheckCircleIcon } from '@patternfly/react-icons';

interface EmptyStateExampleProps {
  onAction: () => void;
}

export const EmptyStateExample: React.FC<EmptyStateExampleProps> = ({ onAction }) => {
  const [filtersCleared, setFiltersCleared] = useState(false);

  const handleClearFilters = () => {
    setFiltersCleared(true);
    onAction();

    // Reset after 2 seconds to allow re-testing
    setTimeout(() => setFiltersCleared(false), 2000);
  };

  if (filtersCleared) {
    return (
      <EmptyState
        titleText="Filters cleared!"
        headingLevel="h2"
        icon={<CheckCircleIcon />}
      >
        <EmptyStateBody data-testid="success-message">
          Try searching again with updated criteria.
        </EmptyStateBody>
      </EmptyState>
    );
  }

  return (
    <EmptyState
      titleText="No results found"
      headingLevel="h2"
      icon={<SearchIcon />}
    >
      <EmptyStateBody>
        Try adjusting your search criteria or filters.
      </EmptyStateBody>
      <Button variant="primary" onClick={handleClearFilters}>
        Clear filters
      </Button>
    </EmptyState>
  );
};
