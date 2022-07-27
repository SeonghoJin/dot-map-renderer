import React, { useRef, useEffect } from 'react';
import { DotMap, DotMapOptionArg } from '@dot-map-renderer/app';
import { LineData } from '@dot-map-renderer/component/src/line/LineData';
import { Point } from '@dot-map-renderer/component/src/Point';
import { IController } from '@dot-map-renderer/canvas/src/IController';
import { IComponent } from '@dot-map-renderer/component/src/IComponent';

type Props = {
    anchors?: Point[],
    lines?: LineData[],
    components?: IComponent[],
} & Pick<React.ComponentProps<'div'>,
    'style' |
    'className'
    > & Partial<DotMapOptionArg>;

export function ReactDotMap({
    anchors = [],
    lines = [],
    components = [],
    style,
    className,
    backgroundColor,
    gapSize,
    pixelColor,
    pixelSize,
    dotType,
    renderer,
}: Props)
{
    const ref = useRef<HTMLDivElement>(null);
    const dotMap = useRef<DotMap | null>(null);
    const controller = useRef<IController | null>(null);

    useEffect(() =>
    {
        dotMap.current = new DotMap({
            backgroundColor,
            gapSize,
            pixelColor,
            pixelSize,
            dotType,
            renderer
        });
        dotMap.current?.attach(ref.current!);
        controller.current = dotMap.current?.getController();

        return () =>
        {
            dotMap.current?.detach();
        };
    }, []);

    useEffect(() =>
    {
        lines.forEach((line) =>
        {
            controller.current?.addLine(line);
        });
    }, [lines]);

    useEffect(() =>
    {
        anchors.forEach((anchor) =>
        {
            controller.current?.addAnchor(anchor);
        });
    }, [anchors]);

    useEffect(() =>
    {
        controller.current?.addComponent(components);
    }, [components]);

    useEffect(() =>
    {
        if(backgroundColor){
            controller.current?.setBackground(backgroundColor);
        }
    }, [backgroundColor]);

    useEffect(() =>
    {
        if(gapSize){
            controller.current?.setGapSize(gapSize);
        }
    }, [gapSize]);

    useEffect(() =>
    {
        if(pixelColor){
            controller.current?.setPixelColor(pixelColor);
        }
    }, [pixelColor]);

    useEffect(() =>
    {
        if(pixelSize){
            controller.current?.setPixelSize(pixelSize);
        }
    }, [pixelSize]);

    useEffect(() =>
    {
        if(dotType){
            controller.current?.setDotType(dotType);
        }
    }, [dotType]);

    return <div
        ref={ref}
        style={style}
        className={className}
    />;
}

ReactDotMap.defaultProps = {
    anchors: [],
    backgroundColor: 'white',
    dotType: 'circle',
    gapSize: 5,
    className: '',
    lines: [],
    pixelColor: 'black',
    pixelSize: 5,
    components: [],
    renderer: 'canvas',
    style: {}
} as Required<Props>;

