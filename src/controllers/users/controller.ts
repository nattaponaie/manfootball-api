import express, { Request, Response } from 'express';
import { header, validationResult } from 'express-validator';
import { get } from 'lodash';

import asyncWrapper from 'middleware/async-wrapper';
import lineService from 'services/line';
import { logInfo } from 'utils/logger';

const router = express.Router();

router.get(
  '/users',
  header('access_token').exists(),
  asyncWrapper(async (req: Request, res: Response) => {
    
    validationResult(req).throw();

    const result = await lineService.verifyAccessToken(get(req, ['headers', 'access_token']));
    logInfo('verifyAccessToken', result);
    res.json(result);
  })
);

export default router;
