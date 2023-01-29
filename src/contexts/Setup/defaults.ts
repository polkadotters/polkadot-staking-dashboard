// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NominatorSetup, PoolSetup, SetupContextInterface } from './types';

export const defaultStakeSetup: NominatorSetup = {
  payee: {
    destination: null,
    account: null,
  },
  nominations: [],
  bond: '',
  section: 1,
};

export const defaultPoolSetup: PoolSetup = {
  metadata: '',
  bond: '',
  nominations: [],
  roles: null,
  section: 1,
};

export const defaultSetupContext: SetupContextInterface = {
  // eslint-disable-next-line
  getSetupProgress: (a, b) => {},
  // eslint-disable-next-line
  getNominatorSetupPercent: (a) => 0,
  // eslint-disable-next-line
  getPoolSetupPercent: (a) => 0,
  // eslint-disable-next-line
  setActiveAccountSetup: (t, p) => {},
  // eslint-disable-next-line
  setActiveAccountSetupSection: (t, s) => {},
  // eslint-disable-next-line
  setOnNominatorSetup: (v) => {},
  // eslint-disable-next-line
  setOnPoolSetup: (v) => {},
  onNominatorSetup: false,
  onPoolSetup: false,
};
