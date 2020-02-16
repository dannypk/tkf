import React from 'react';
import { observer } from 'mobx-react';

import FormInput from '../components/input';

import sequenceStore from '../stores/sequence.store';
import authStore from '../stores/auth.store';

@observer
class SequencePage extends React.Component {

  renderLoadingSpinner() {
    return <div>sequence is loading...</div>;
  }

  async componentDidMount() {
    await authStore.verifyUsersToken();
    await sequenceStore.getCurrentSequence();
  }

  render() {
    const { isLoading, sequence } = sequenceStore;
    if (isLoading) {
      return this.renderLoadingSpinner();
    }

    return (
      <div>
        Current: {sequence}

        <FormInput onChange={value => { sequenceStore.currentSequence = value; }}
          value={sequenceStore.currentSequence} placeholder="Reset Sequence" />

        <button onClick={() => sequenceStore.getNextSequence()}>Get next sequence</button>
        <button onClick={() => sequenceStore.getCurrentSequence()}>Get current sequence</button>
        <button onClick={() => sequenceStore.updateCurrentSequence()}>Reset sequence</button>
      </div>
    );
  }
}

export default SequencePage;