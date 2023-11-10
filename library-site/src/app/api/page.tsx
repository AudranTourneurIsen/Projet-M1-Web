'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { FC } from 'react';

const SwaggerPage: FC = () => (
  <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />
);

export default SwaggerPage;
