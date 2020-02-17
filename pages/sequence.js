import React from 'react';
import { observer } from 'mobx-react';

import sequenceStore from '../stores/sequence.store';
import authStore from '../stores/auth.store';

import './sequence.less';

@observer
class SequencePage extends React.Component {

  renderLoadingSpinner() {
    return <div>Verifying user...</div>;
  }

  async componentDidMount() {
    await authStore.verifyUsersToken();

    if (authStore.user) {
      await sequenceStore.getCurrentSequence();
    }
  }

  render() {
    const { isLoading, sequence } = sequenceStore;
    const { user } = authStore;

    if (isLoading || !user) {
      return this.renderLoadingSpinner();
    }

    return (
      <div className="SequencePage">
        <h1>Hello {user.name}!</h1>
        <div>Current sequence is: {sequence}</div>

        <button className="SequencePage-nextSequenceButton"
          onClick={() => sequenceStore.getNextSequence()}>Get next sequence
        </button>
        <button className="SequencePage-currentSequenceButton"
          onClick={() => sequenceStore.getCurrentSequence()}>Get current sequence
        </button>

        <div className="SequencePage-resetSequence">
          <button className="SequencePage-resetSequenceButton"
            onClick={() => sequenceStore.updateCurrentSequence()}>Reset sequence
          </button>
          
          <input className="SequencePage-resetSequenceInput"
            onChange={event => { sequenceStore.currentSequence = event.target.value; }}
            value={sequenceStore.currentSequence} placeholder="Reset Sequence" />
        </div>
      </div>
    );
  }
}

export default SequencePage;