import { ErrorRequestHandler } from 'express';
import { InternalServerError } from 'http-errors';

/**
 * The last backstop for errors that do not conform to one of Sidecars error
 * format. Used to create a standardized 500 error instead of relying on express.
 *
 * @param exception any
 * @param _req Express Request
 * @param res Express Response
 * @param next Express NextFunction
 */
export const internalErrorMiddleware: ErrorRequestHandler = (
	exception: unknown,
	_req,
	res,
	next
): void => {
	// If express has started writing the response, we must default to the
	// built in express error handler in order to close the connection.
	if (res.headersSent) {
		return next(exception);
	}

	res.status(500).send(new InternalServerError('Internal Error'));
};
