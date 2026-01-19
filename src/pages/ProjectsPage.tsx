import React from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Divider
} from '@patternfly/react-core';
import {
  UserProfile,
  StatusBadge,
  PageHeader
} from '../components';

export const ProjectsPage: React.FC = () => {
  return (
    <>
      <PageSection variant="light">
        <Breadcrumb>
          <BreadcrumbItem to="#">Home</BreadcrumbItem>
          <BreadcrumbItem isActive>Projects</BreadcrumbItem>
        </Breadcrumb>
        <Title headingLevel="h1" size="2xl" className="pf-v5-u-mt-md">
          Projects
        </Title>
        <p className="pf-v5-u-mt-sm pf-v5-u-color-200">
          Manage and track your project teams and deliverables
        </p>
      </PageSection>
      <Divider />
      <PageSection>
        <Card className="pf-v5-u-mb-md">
          <CardBody>
            <Title headingLevel="h2" size="lg" className="pf-v5-u-mb-md">
              Project Members
            </Title>
            <p className="pf-v5-u-mb-md pf-v5-u-font-size-sm pf-v5-u-color-200">
              View and manage project team members
            </p>
            <UserProfile
              name="Jane Doe"
              role="Senior Software Engineer"
              email="jane.doe@example.com"
            />
          </CardBody>
        </Card>

        <Card className="pf-v5-u-mb-md">
          <CardBody>
            <Title headingLevel="h2" size="lg" className="pf-v5-u-mb-md">
              Project Status
            </Title>
            <p className="pf-v5-u-mb-md pf-v5-u-font-size-sm pf-v5-u-color-200">
              Track project status and current state
            </p>
            <PageHeader
              title="Component Examples"
              subtitle="Interactive status indicators"
            />
            <div className="pf-v5-u-mt-md" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <StatusBadge status="active" isDisabled={false} />
              <StatusBadge status="pending" />
              <StatusBadge status="inactive" isDisabled={true} />
            </div>
          </CardBody>
        </Card>

        <div
          className="pf-v5-u-p-md pf-v5-u-background-color-200"
          style={{ borderRadius: '4px', border: '1px solid #d2d2d2' }}
        >
          <strong>Project Information:</strong>
          <ul className="pf-v5-u-mt-sm pf-v5-u-font-size-sm">
            <li>View team member profiles and contact information</li>
            <li>Monitor project status with interactive badges</li>
            <li>Toggle additional details as needed</li>
            <li>Responsive design for all screen sizes</li>
          </ul>
        </div>
      </PageSection>
    </>
  );
};
