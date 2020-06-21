import { get } from 'lodash';
import { logError } from 'utils/logger';

export default (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    logError(err);
    const status = get(err, ['status'], 500);
    const model = get(err, ['model']);
    const message = get(err, ['message']);
    res.status(status);
    res.json({ status, model, message });
  });
};
