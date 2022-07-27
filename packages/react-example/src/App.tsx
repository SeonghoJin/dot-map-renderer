import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import {ReactDotMap} from '@dot-map-renderer/react';

function App()
{
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const [gapSize, setGapSize] = useState<number>(5);

    const onChangeBackgroundColor: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(e.target.value);
    }

    const onChangeGapSize: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setGapSize(parseInt(e.target.value));
    }


    return <div>
        backgroundColor
        <input onChange={onChangeBackgroundColor}/>
        <br/>
        gapSize
        <input onChange={onChangeGapSize}/>
        <ReactDotMap
            anchors={[]}
            lines={[]}
            backgroundColor={backgroundColor}
            gapSize={gapSize}
        />
    </div>
}

export default App;
