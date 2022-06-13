// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useUi } from 'contexts/UI';
import { PayoutLine } from 'library/Graphs/PayoutLine';
import { PayoutBar } from 'library/Graphs/PayoutBar';
import { useSize, formatSize } from 'library/Graphs/Utils';
import { StatusLabel } from 'library/StatusLabel';

export const PayoutsInner = (props: any) => {
  const { payouts } = props;
  const { services } = useUi();

  const ref: any = React.useRef();
  const size = useSize(ref.current);
  const { width, height, minHeight } = formatSize(size, 306);

  return (
    <div className="inner" ref={ref} style={{ minHeight }}>
      {!services.includes('subscan') ? (
        <StatusLabel
          status="active_service"
          statusFor="subscan"
          title="Subscan Disabled"
        />
      ) : (
        <StatusLabel status="sync_or_setup" title="Not Staking" />
      )}

      <div
        className="graph"
        style={{
          height: `${height}px`,
          width: `${width}px`,
          position: 'absolute',
        }}
      >
        <PayoutBar payouts={payouts} height="170px" />
        <div style={{ marginTop: '1rem' }}>
          <PayoutLine payouts={payouts} height="70px" />
        </div>
      </div>
    </div>
  );
};

export class Payouts extends React.Component<any, any> {
  // stop component refersh triggered by other API updates
  shouldComponentUpdate(nextProps: any, nextState: any) {
    const propsChanged = nextProps.account !== this.props.account;
    const payoutsChanged = nextProps.payouts !== this.props.payouts;
    return propsChanged || payoutsChanged;
  }

  render() {
    return <PayoutsInner {...this.props} />;
  }
}

export default Payouts;
