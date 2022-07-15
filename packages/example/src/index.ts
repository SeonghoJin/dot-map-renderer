import { DotMap } from '@dot-map-renderer/app';

const $body = document.querySelector('body');

const dotMap = new DotMap({
  dotType: 'rectangular',
  backgroundColor: 'blue',
  pixelSize: 5,
  gapSize: 8,
});

dotMap.attach($body!);
const controller = dotMap.getController();

controller.addAnchor([13, 81]);
controller.addAnchor([13, 43]);
controller.addAnchor([13, 13]);
controller.addAnchor([13, 30]);

controller.addLine([
  [13, 43],
  [50, 11],
]);
controller.addLine([
  [13, 43],
  [16, 12],
]);
controller.addLine([
  [13, 43],
  [48, 99],
]);

dotMap.detach();
