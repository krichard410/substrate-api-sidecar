import { Balance, Perbill, RewardPoint } from '@polkadot/types/interfaces';
import * as BN from 'bn.js';

export interface IPayout {
	validatorId: string;
	nominatorPayoutEstimate: BN;
	claimed: boolean;
	validatorTotalPayoutEstimate: BN;
	validatorCommissionPayoutEstimate: BN;
	validatorCommission: Perbill;
	validatorRewardPoints: RewardPoint;
	totalValidatorExposure: Balance;
	nominatorExposure: Balance;
}
