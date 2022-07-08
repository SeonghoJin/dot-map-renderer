export abstract class Observer<State> {
  subscribers: Set<ISubscriber<State>>;
  state: State;

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

  abstract changeState(): void;
}

export interface ISubscriber<State = unknown> {
  execute(data: State): void;
}
