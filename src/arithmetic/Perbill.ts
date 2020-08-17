import * as BN from 'bn.js';

export default class Perbill {
	static readonly one = new BN(1_000_000_000);
	/**
	 * Aproximate mimic of substrate's per_things `from_rational_approximation`
	 *
	 * @param p
	 * @param q
	 */
	static fromRationalApproximation(p: BN, q: BN): BN {
		const divCeil = (x: BN, f: BN) => {
			let o = x.div(f);
			const r = x.mod(f);
			console.log('r', r);
			if (r.gten(0)) {
				o = o.addn(1);
			}

			return o;
		};

		const qMax = q.gtn(1) ? q : new BN(1);

		const pMin = p.lt(q) ? p : q;

		const factor = divCeil(qMax, this.one);

		const qReduce = qMax.div(factor);

		const pReduce = pMin.div(factor);

		const part = pReduce.mul(this.one).div(qReduce);

		return part;
	}
}
