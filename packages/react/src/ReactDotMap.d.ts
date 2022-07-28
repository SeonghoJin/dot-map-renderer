import React from 'react';
import { DotMapOptionArg } from '@dot-map-renderer/app';
import { ILine } from '@dot-map-renderer/component/src/line';
import { Point } from '@dot-map-renderer/component/src/Point';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';
declare type Props = {
  anchors?: Point[];
  lines?: ILine[];
  components?: IComponent[];
} & Pick<React.ComponentProps<'div'>, 'style' | 'className'> &
  Partial<DotMapOptionArg>;
export declare function ReactDotMap({
  anchors,
  lines,
  components,
  style,
  className,
  backgroundColor,
  gapSize,
  pixelColor,
  pixelSize,
  dotType,
  renderer,
}: Props): JSX.Element;
export declare namespace ReactDotMap {
  var defaultProps: Required<Props>;
}
export {};
