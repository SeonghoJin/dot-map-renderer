export declare abstract class Observer<State> {
  private subscribers;
  protected state: State;
  protected constructor(initState: State);
  subscribe(subscriber: ISubscriber<State>): void;
  notify(): void;
  abstract changeState(state: State): void;
}
export interface ISubscriber<State = unknown> {
  execute(data: State): void;
}
