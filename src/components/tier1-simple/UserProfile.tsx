import React from 'react';
import {
  Content,
  Card,
  CardBody
} from '@patternfly/react-core';

interface UserProfileProps {
  name: string;
  role: string;
  email: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ name, role, email }) => {
  return (
    <Card>
      <CardBody>
        <Content>
          <h2>{name}</h2>
          <p>{role}</p>
          <small>{email}</small>
        </Content>
      </CardBody>
    </Card>
  );
};
