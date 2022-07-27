import { DotMap } from '@dot-map-renderer/app';
import { IController } from '@dot-map-renderer/canvas';

const $body = document.querySelector('body')!;
const $create: HTMLButtonElement = document.querySelector('#create')!;
const $remove: HTMLButtonElement = document.querySelector('#remove')!;
const $addAnchor: HTMLButtonElement = document.querySelector('#addAnchor')!;
const $addLine: HTMLButtonElement = document.querySelector('#addLine')!;
const $latlng1: HTMLInputElement = document.querySelector('#latlng1')!;
const $latlng2: HTMLInputElement = document.querySelector('#latlng2')!;
const $anchorLatLng: HTMLInputElement = document.querySelector('#anchor_latlng')!;

const valueToLatLng = (value: string): [number, number] => {
  if (!value.includes(',')) {
    throw new Error('not latlng format');
  }

  const splitedValue = value.split(',');

  if (splitedValue.length !== 2) {
    throw new Error('not latlng format');
  }

  try {
    return splitedValue.map((val) => parseInt(val)) as [number, number];
  } catch (e) {
    throw new Error('not latlng format');
  }
};

const dotMap = new DotMap({
  dotType: 'rectangular',
  backgroundColor: 'blue',
  pixelSize: 5,
  gapSize: 8,
});

dotMap.attach($body as any);
let controller: null | IController = dotMap.getController();

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

$remove.addEventListener('click', () => {
  dotMap.detach();
  controller = null;
});

$create.addEventListener('click', () => {
  if (controller === null) {
    dotMap.attach($body);
    controller = dotMap.getController();

    return;
  }

  console.error('defined dot map, if you want to create dot map, using detaching api and create');
});

$addAnchor.addEventListener('click', () => {
  try {
    const point = valueToLatLng($anchorLatLng.value);

    controller?.addAnchor(point);
  } catch (e: any) {
    console.error(e.message);
  }
});

$addLine.addEventListener('click', () => {
  try {
    const point1 = valueToLatLng($latlng1.value);
    const point2 = valueToLatLng($latlng2.value);

    controller?.addLine([point1, point2]);
  } catch (e: any) {
    console.error(e.message);
  }
});
