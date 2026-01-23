import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Alert,
  Divider
} from '@patternfly/react-core';
import {
  CompatibilityLayer,
  ConsumerComponent
} from '../components';

export const StoragePage: React.FC = () => {
  const [showAdvancedFeatures, setShowEdgeCases] = useState(true);

  return (
    <>
      <PageSection variant="light">
        <Breadcrumb>
          <BreadcrumbItem to="#">Home</BreadcrumbItem>
          <BreadcrumbItem isActive>Storage</BreadcrumbItem>
        </Breadcrumb>
        <Title headingLevel="h1" size="2xl" className="pf-v6-u-mt-md">
          Storage
        </Title>
        <p className="pf-v6-u-mt-sm pf-v6-u-color-200">
          Advanced storage management and configuration options
        </p>
      </PageSection>
      <Divider />
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title headingLevel="h2" size="xl">
            Advanced Storage Features
          </Title>
          <Button
            variant="secondary"
            onClick={() => setShowEdgeCases(!showAdvancedFeatures)}
          >
            {showAdvancedFeatures ? 'Hide' : 'Show'} Advanced Features
          </Button>
        </div>

        {showAdvancedFeatures && (
          <>
            <Alert
              variant="info"
              title="Advanced Storage Configuration"
              className="pf-v6-u-mb-md"
              isInline
            >
              These components demonstrate advanced storage management patterns and
              configuration options for complex scenarios.
            </Alert>

            <Card className="pf-v6-u-mb-md">
              <CardBody>
                <Title headingLevel="h3" size="lg" className="pf-v6-u-mb-md">
                  Compatibility Layer
                </Title>
                <Alert
                  variant="info"
                  title="Compatibility Layer"
                  className="pf-v6-u-mb-md"
                  isInline
                >
                  This component provides compatibility support for different storage configurations
                  while maintaining backward compatibility with existing systems.
                </Alert>
                <CompatibilityLayer useModern={false}>
                  This component maintains dual configuration support for flexible storage management
                </CompatibilityLayer>
              </CardBody>
            </Card>

            <Card className="pf-v6-u-mb-md">
              <CardBody>
                <Title headingLevel="h3" size="lg" className="pf-v6-u-mb-md">
                  Custom Wrapper Component
                </Title>
                <Alert
                  variant="info"
                  title="Custom Storage Wrapper"
                  className="pf-v6-u-mb-md"
                  isInline
                >
                  This custom wrapper provides organization-specific storage behaviors while
                  maintaining a stable API for consuming applications.
                </Alert>
                <ConsumerComponent />
              </CardBody>
            </Card>

            <Card className="pf-v6-u-mb-md">
              <CardBody>
                <Title headingLevel="h3" size="lg" className="pf-v6-u-mb-md">
                  Dynamic Storage Configuration
                </Title>
                <Alert
                  variant="info"
                  title="Flexible Configuration"
                  className="pf-v6-u-mb-md"
                  isInline
                >
                  Dynamic storage patterns allow runtime configuration based on
                  environment variables and deployment contexts.
                </Alert>
                <div className="pf-v6-u-p-md pf-v6-u-background-color-100" style={{ borderRadius: '4px' }}>
                  <code>configureStorage(`$&#123;environment&#125;/storage-config`)</code>
                  <p className="pf-v6-u-mt-sm pf-v6-u-font-size-sm">
                    This pattern allows flexible storage configuration per deployment environment.
                  </p>
                </div>
              </CardBody>
            </Card>

            <div
              className="pf-v6-u-p-md pf-v6-u-background-color-200"
              style={{ borderRadius: '4px', border: '1px solid #d2d2d2' }}
            >
              <strong>Advanced Storage Features:</strong>
              <ul className="pf-v6-u-mt-sm pf-v6-u-font-size-sm">
                <li>Compatibility layers for legacy storage systems</li>
                <li>Stable APIs for consistent storage interfaces</li>
                <li>Dynamic configuration for multiple environments</li>
                <li>Custom wrappers for organization-specific needs</li>
                <li>Flexible patterns for complex storage requirements</li>
              </ul>
            </div>
          </>
        )}
      </PageSection>
    </>
  );
};
