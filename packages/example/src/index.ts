import { DotMap } from '@dot-map-renderer/app';

const $body = document.querySelector('body');

const dotMap = new DotMap({
  dotType: 'rectangular',
  backgroundColor: 'blue',
  pixelSize: 5,
  gapSize: 8,
});

dotMap.attaching($body);
const { controller } = dotMap;

controller.addAnchors([13, 81]);
controller.addAnchors([13, 43]);
controller.addAnchors([13, 13]);
controller.addAnchors([13, 30]);
