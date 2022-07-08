import { ISubscriber, Observer } from '../src/observer';

type TestState = string;

class TestModel extends Observer<TestState> {
  constructor(initState: TestState) {
    super(initState);
  }

  override changeState(state: TestState) {
    this.state = state;
    this.notify();
  }
}

class TestView implements ISubscriber<TestState> {
  customState = '';

  execute(data: TestState): void {
    this.customState = `view ${data}`;
  }
}

test('observer test 1', () => {
  const model = new TestModel('');
  const view = new TestView();

  model.subscribe(view);
  model.changeState('hello');

  expect(view.customState).toEqual('view hello');

  model.changeState('hello2');

  expect(view.customState).toEqual('view hello2');
});
