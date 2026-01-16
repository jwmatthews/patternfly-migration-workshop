import React, { useState } from 'react';
import {
  Page,
  PageSection,
  Masthead,
  MastheadBrand,
  MastheadMain,
  Button
} from '@patternfly/react-core';
import {
  UserProfile,
  StatusBadge,
  PageHeader,
  ActionMenu,
  EmptyStateExample,
  IconButtons,
  CompatibilityLayer,
  CustomText,
  ConsumerComponent
} from './components';
import './styles/components.css';
import './styles/tokens.css';

export const App: React.FC = () => {
  const [interactionsCount, setInteractionsCount] = useState(0);
  const [showTier3, setShowTier3] = useState(true);

  const handleInteraction = () => {
    setInteractionsCount(prev => prev + 1);
  };

  return (
    <Page
      header={
        <Masthead>
          <MastheadMain>
            <MastheadBrand>
              PatternFly Migration Workshop
            </MastheadBrand>
          </MastheadMain>
        </Masthead>
      }
    >
      <PageSection>
        <PageHeader
          title="Component Examples"
          subtitle="PatternFly v5 → v6 Migration Patterns"
        />

        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <strong>Migration Validation:</strong> Total interactions: {interactionsCount}
          <p style={{ fontSize: '12px', margin: '4px 0 0 0', color: '#666' }}>
            Each interaction proves the migrated components still work correctly
          </p>
        </div>
      </PageSection>

      <PageSection className="pf-v5-u-mt-lg">
        <h2 className="pf-v5-c-title pf-m-xl">Tier 1: Simple Changes</h2>

        <div className="app-section">
          <h3>User Profile Component</h3>
          <UserProfile
            name="Jane Doe"
            role="Senior Software Engineer"
            email="jane.doe@example.com"
          />
        </div>

        <div className="app-section">
          <h3>Status Badge Component (Interactive)</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Click badges to test event handlers after migration:
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <StatusBadge status="active" isDisabled={false} />
            <StatusBadge status="pending" />
            <StatusBadge status="inactive" isDisabled={true} />
          </div>
        </div>
      </PageSection>

      <PageSection className="pf-v5-u-mt-lg">
        <h2 className="pf-v5-c-title pf-m-xl">Tier 2: Moderate Complexity</h2>

        <div className="app-section">
          <h3>Action Menu Component (Interactive)</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Open menu and select actions to test MenuToggle migration:
          </p>
          <ActionMenu
            onEdit={handleInteraction}
            onDelete={handleInteraction}
          />
        </div>

        <div className="app-section">
          <h3>Icon Buttons Component (Interactive)</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Click buttons to test icon prop migration:
          </p>
          <IconButtons
            onAdd={handleInteraction}
            onEdit={handleInteraction}
            onDelete={handleInteraction}
          />
        </div>

        <div className="app-section">
          <h3>Empty State Component (Interactive)</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>
            Click "Clear filters" to test EmptyState structure changes:
          </p>
          <EmptyStateExample
            onAction={handleInteraction}
          />
        </div>
      </PageSection>

      <PageSection className="pf-v5-u-mt-lg pf-v5-u-mb-lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="pf-v5-c-title pf-m-xl">Tier 3: Edge Cases</h2>
          <Button
            variant="secondary"
            onClick={() => setShowTier3(!showTier3)}
          >
            {showTier3 ? 'Hide' : 'Show'} Edge Cases
          </Button>
        </div>

        {showTier3 && (
          <>
            <div className="app-section">
              <h3>Compatibility Layer (Intentional Dual Support)</h3>
              <p style={{ fontSize: '14px', marginBottom: '8px', color: '#856404', backgroundColor: '#fff3cd', padding: '8px', borderRadius: '4px' }}>
                ⚠️ This component should NOT be auto-migrated - it intentionally uses v5 patterns
              </p>
              <CompatibilityLayer useV6={false}>
                This uses a compatibility layer for gradual migration
              </CompatibilityLayer>
            </div>

            <div className="app-section">
              <h3>Custom Wrapper Component</h3>
              <p style={{ fontSize: '14px', marginBottom: '8px', color: '#004085', backgroundColor: '#cce5ff', padding: '8px', borderRadius: '4px' }}>
                ℹ️ Internal implementation migrates, but public API stays stable
              </p>
              <ConsumerComponent />
            </div>
          </>
        )}
      </PageSection>
    </Page>
  );
};
