import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { NodeVersionService } from '../../services';
import AbstractController from '../AbstractController';

export default class NodeVersionController extends AbstractController<
	NodeVersionService
> {
	constructor(api: ApiPromise) {
		super(api, '/node/version', new NodeVersionService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([['', this.getNodeVersion]]);
	}

	/**
	 * Get version information of the node.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	getNodeVersion: RequestHandler = async (_req, res): Promise<void> => {
		const hash = await this.api.rpc.chain.getFinalizedHead();

		NodeVersionController.sanitizedSend(
			res,
			await this.service.fetchVersion(hash)
		);
	};
}