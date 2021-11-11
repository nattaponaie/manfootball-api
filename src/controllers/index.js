import BaseRoute from './_baseRoute';

import users from './users/controller';

const apiv1p0 = BaseRoute({
  version: 'v1.0',
  routes: [
    users
  ],
});

// List of all supporting APIs
export const supportApis = [
  apiv1p0
];

// Always specify the latest API version supporting as the default
export const defaultApi = apiv1p0;