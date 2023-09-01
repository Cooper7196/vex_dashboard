import React from 'react';
import { Text, Rect } from 'react-konva';
import { Html } from 'react-konva-utils';

import Window from '../Window';
import Icon from '../Icon';





// You can't have any HTML inside of an Icon
export function TextBoxIcon({ x, y, width, height, padding, setWindows, windows, delWindow }) {
    return (
        <Icon x={x} y={y} width={width} height={height} padding={padding} title="TextBox" isIcon={true} window={TextBox} windows={windows} setWindows={setWindows} delWindow={delWindow}>
            <TextBoxIconInternal />
        </Icon>
    );
}

function TextBox({ x, y, width, height, padding, delWindow, setWindows, windows }) {
    return (
        <Window x={x} y={y} width={width} height={height} padding={padding} title="TextBox" delWindow={delWindow} windows={windows} setWindows={setWindows}>
            <TextBoxInternal />
        </Window>
    );
}


function TextBoxIconInternal({ width, height }) {
    return (<>
        <Text
            x={0}
            y={height * 0.4}
            width={width}
            height={height}
            fill="#fff"
            fontSize={18}
            align="center"
            text={"Count: 0"}
        />
        <Rect
            x={width * 0.125}
            y={height * 0.63}
            width={width * 0.75}
            height={height * 0.33}
            fill="#fff"
        />
    </>
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