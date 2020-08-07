import IsoDate, { IsoDateTime } from './isodate';

const patchableKeys = ['summary', 'description', 'dueDate', 'isCompleted'];

export default class Action {
  constructor({
    id,
    created,
    summary,
    description,
    dueDate,
    isCompleted,
    completedDate
  }) {
    this.id = id;
    this.created = created;
    this.summary = summary;
    this.description = description;
    this.dueDate = IsoDate.parse(dueDate);
    this._isCompleted = isCompleted;
    this.completedDate = IsoDateTime.parse(completedDate);
  }

  get isCompleted() {
    return this._isCompleted;
  }

  set isCompleted(isCompleted) {
    this._isCompleted = isCompleted;
    this.completedDate = isCompleted ? IsoDateTime.now() : undefined;
  }

  update(patch) {
    return Object.assign(
      this,
      Object.fromEntries(
        Object.entries(patch).filter(([key]) => patchableKeys.includes(key))
      )
    );
  }
}
