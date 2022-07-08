export abstract class Observer<State> {
  private subscribers: Set<ISubscriber<State>>;
  protected state: State;

  protected constructor(initState: State) {
    this.subscribers = new Set();
    this.state = initState;
  }

  public subscribe(subscriber: ISubscriber<State>) {
    this.subscribers.add(subscriber);
  }

  public notify() {
    this.subscribers.forEach((subscriber) => {
      subscriber.execute(this.state);
    });
  }

  abstract changeState(state: State): void;
}

export interface ISubscriber<State = unknown> {
  execute(data: State): void;
}
