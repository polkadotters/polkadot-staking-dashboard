// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useConnect } from 'contexts/Connect';
import { useSetup } from 'contexts/Setup';
import { PayeeConfig, PayeeOptions } from 'contexts/Setup/types';
import { Spacer } from 'library/Form/Wrappers';
import { PayeeItem, usePayeeConfig } from 'library/Hooks/usePayeeConfig';
import { PayeeInput } from 'library/PayeeInput';
import { SelectItems } from 'library/SelectItems';
import { SelectItem } from 'library/SelectItems/Item';
import { Footer } from 'library/SetupSteps/Footer';
import { Header } from 'library/SetupSteps/Header';
import { MotionContainer } from 'library/SetupSteps/MotionContainer';
import { SetupStepProps } from 'library/SetupSteps/types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaybeAccount } from 'types';

export const Payee = ({ section }: SetupStepProps) => {
  const { t } = useTranslation('pages');
  const { getPayeeItems } = usePayeeConfig();
  const { activeAccount } = useConnect();
  const { getSetupProgress, setActiveAccountSetup } = useSetup();

  const setup = getSetupProgress('nominator', activeAccount);
  const { progress } = setup;
  const { payee } = progress;

  // Store the current user-inputted custom payout account.
  const [account, setAccount] = useState<MaybeAccount>(payee.account);

  const DefaultPayeeConfig: PayeeConfig = {
    destination: 'Staked',
    account: null,
  };

  // determine whether this section is completed.
  const isComplete = () =>
    payee.destination !== null &&
    !(payee.destination === 'Account' && payee.account === null);

  // update setup progress with payee config.
  const handleChangeDestination = (destination: PayeeOptions) => {
    // set local value to update input element set setup payee
    setActiveAccountSetup('nominator', {
      ...progress,
      payee: { destination, account },
    });
  };

  // update setup progress with payee account.
  const handleChangeAccount = (newAccount: MaybeAccount) => {
    // set local value to update input element set setup payee
    setActiveAccountSetup('nominator', {
      ...progress,
      payee: { ...payee, account: newAccount },
    });
  };

  // set initial payee value to `Staked` if not yet set.
  useEffect(() => {
    if (!payee || (!payee.destination && !payee.account)) {
      setActiveAccountSetup('nominator', {
        ...progress,
        payee: DefaultPayeeConfig,
      });
    }
  }, [activeAccount]);

  return (
    <>
      <Header
        thisSection={section}
        complete={isComplete()}
        title={`${t('nominate.payoutDestination')}`}
        helpKey="Payout Destination"
        bondFor="nominator"
      />
      <MotionContainer thisSection={section} activeSection={setup.section}>
        <h4 style={{ marginTop: '0.5rem' }}>
          {t('nominate.payoutDestinationSubtitle')}
        </h4>

        <SelectItems layout="three-col">
          {getPayeeItems().map((item: PayeeItem) => (
            <SelectItem
              key={`payee_option_${item.value}`}
              account={account}
              setAccount={setAccount}
              selected={payee.destination === item.value}
              onClick={() => handleChangeDestination(item.value)}
              layout="three-col"
              {...item}
            />
          ))}
        </SelectItems>
        <Spacer />
        <PayeeInput
          payee={payee}
          account={account}
          setAccount={setAccount}
          handleChange={handleChangeAccount}
        />
        <Footer complete={isComplete()} bondFor="nominator" />
      </MotionContainer>
    </>
  );
};
