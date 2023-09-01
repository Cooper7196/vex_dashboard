import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import './App.css';
import components from './Windows/components';

export const BLOCK_SNAP_SIZE = 40;
export const GRID_START = { x: BLOCK_SNAP_SIZE * 6, y: 0 };


function delWindow(windows, setWindows) {
  console.log("delWindow")
  const copyArr = [...windows];
  copyArr.splice(-1);
  setWindows(copyArr);
}

function App() {
  const [windows, setWindows] = React.useState([]);



  console.log(windows);
  let icons = [];
  let i = 0;
  for (let key in components) {
    icons.push(
      React.createElement(components[key], {
        x: BLOCK_SNAP_SIZE,
        y: BLOCK_SNAP_SIZE + (i * BLOCK_SNAP_SIZE) * 4,
        width: 4,
        height: 4,
        padding: 10,
        windows: windows,
        setWindows: setWindows,
        delWindow: delWindow,
      })
    );
    i++;
  }
  return (
    <Stage width={window.innerWidth} height={window.innerHeight} >
      <Layer>
        <Grid size={BLOCK_SNAP_SIZE} />
      </Layer>

      <Layer>
        <Line
          points={[BLOCK_SNAP_SIZE * 6, 0, BLOCK_SNAP_SIZE * 6, window.innerHeight]}
          stroke={"#000"}
          strokeWidth={10}
        />
        <Rect
          x={0}
          y={0}
          fill="#2C2C2C"
          width={BLOCK_SNAP_SIZE * 6}
          height={window.innerHeight}
        />

        {icons}
      </Layer>

      <Layer>
        {windows}
      </Layer>
    </Stage >
  );
};



function Grid({ size }) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const grid = [];
  for (let x = GRID_START.x; x < width; x += size) {
    grid.push(
      <Line
        key={"x" + x}
        points={[x, 0, x, height]}
        stroke="#222"
        strokeWidth={((x - GRID_START.x) / size % 4 === 0) ? 5 : 2}
      />,
    );
  }

  for (let y = GRID_START.y; y < height; y += size) {
    grid.push(
      <Line
        key={"y" + y}
        points={[0, y, width, y]}
        stroke="#222"
        strokeWidth={((y - GRID_START.y) / size % 4 === 0) ? 5 : 2}
      />,
    );
  }
  return (<>
    <Rect
      x={0}
      y={0}
      fill="#333"
      width={width}
      height={height}
    />
    {grid}
  </>);
}

export default App;
