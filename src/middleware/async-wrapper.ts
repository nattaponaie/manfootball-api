import { Request, Response, NextFunction } from 'express';
import {
  get,
} from 'lodash';
import {
  logError,
} from 'utils/logger';

export default (fn: any) => (req: Request, res: Response, next: NextFunction ) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logError(err);
    const status = get(err, ['status'], 500);
    const model = get(err, ['model']);
    const message = get(err, ['message']) || get(err, ['errors']);
    res.status(status);
    res.json({
      status,
      model,
      message,
    });
  });
};
