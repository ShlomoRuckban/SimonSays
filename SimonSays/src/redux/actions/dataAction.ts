export interface DataModel {
  name: string;
  scores: number;
}

export interface GatherAction {
  readonly type: 'ON_START';
  payload: DataModel;
}

export interface ErrorAction {
  readonly type: 'ON_ERROR';
  payload: any;
}

export type DataAction = GatherAction | ErrorAction;
