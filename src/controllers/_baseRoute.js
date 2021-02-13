import express from 'express';

export default ({
  version,
  routes
}) => {
  const router = express.Router();
  router.use(routes);

  return {
    router,
    version,
  };
};