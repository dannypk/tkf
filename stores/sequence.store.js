import { observable } from 'mobx';

import sequenceService from '../services/sequence.service';

class SequenceStore {
  @observable sequence = 0;
  @observable currentSequence = 0;
  @observable isSequenceLoading = false;

  async getCurrentSequence() {
    this.isSequenceLoading = true;
    this.sequence = await sequenceService.getCurrentSequence();
    this.isSequenceLoading = false;
  }

  async getNextSequence() {
    this.sequence = await sequenceService.getNextSequence();
  }

  async updateCurrentSequence() {
    await sequenceService.updateCurrentSequence(this.currentSequence);
    this.sequence = this.currentSequence;
  }
}

export default new SequenceStore();