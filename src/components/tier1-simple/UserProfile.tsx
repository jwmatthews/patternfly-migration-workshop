import React from 'react';
import {
  Text,
  TextContent,
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
        <TextContent>
          <Text component="h2">{name}</Text>
          <Text component="p">{role}</Text>
          <Text component="small">{email}</Text>
        </TextContent>
      </CardBody>
    </Card>
  );
};
