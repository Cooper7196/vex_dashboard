import React from 'react';
import { Text } from 'react-konva';
import { Html } from 'react-konva-utils';

import Window from '../Window';
import { GRID_START } from '../App';


export default function TextBox() {
    return (
        <Window x={GRID_START.x} y={GRID_START.y} width={4} height={4} padding={20} title={"TextBox"}>
            <TextBoxInternal />
        </Window>
    );
}

function TextBoxInternal({ width, height }) {
    const [count, setCount] = React.useState(0);
    return (
        <>
            <Text
                x={0}
                y={height * 0.4}
                width={width}
                height={height}
                fill="#fff"
                fontSize={18}
                align="center"
                text={"Count: " + count}
            />

            <Html
                divProps={{
                    style: {
                        width: width + "px",
                        height: height + "px",
                        display: 'flex',
                    }
                }}
            >
                <button style={{
                    padding: '5px 10px',
                    margin: 'auto',
                    position: 'relative',
                    bottom: 'calc(10% - 30px)',
                }} onClick={() => {
                    setCount(count + 1);
                }}>Increment</button>
            </Html >
        </>
    );
}