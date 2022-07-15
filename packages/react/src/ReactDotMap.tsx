import React from 'react';
import { useRef, useEffect } from 'react';
import { DotMap, DotMapOptionArg } from '@dot-map-renderer/app';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { Point } from '@dot-map-renderer/component';
import { IController } from '@dot-map-renderer/canvas';

type Props = {
    anchors: Point[],
    lines: LineData[],
    options?: DotMapOptionArg,
} & Pick<React.ComponentProps<'div'>,
    'style' |
    'className'
    >;

export function ReactDotMap({
    anchors,
    lines,
    options,
    style,
    className
}: Props)
{
    const ref = useRef<HTMLDivElement>(null);
    const dotMap = useRef<DotMap | null>(null);
    const controller = useRef<IController | null>(null);

    useEffect(() =>
    {
        dotMap.current = new DotMap(options);
        dotMap.current.attach(ref.current!);
        controller.current = dotMap.current!.getController();


        return () =>
        {
            dotMap.current?.detach();
        };
    }, [options]);

    useEffect(() =>
    {
        if (controller.current === null)
        {
            return;
        }

        lines.forEach((line) =>
        {
            controller.current!.addLine(line);
        });

        anchors.forEach((anchor) =>
        {
            controller.current!.addAnchor(anchor);
        });
    }, [controller, lines, anchors]);

    return <div
        ref={ref}
        style={style}
        className={className}
    />;
}
