import React from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import './App.css';

import TextBox from './Windows/TextBox';

export const BLOCK_SNAP_SIZE = 40;
export const GRID_START = { x: BLOCK_SNAP_SIZE * 6, y: 0 };

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
      </Layer>

      <Layer>
        <TextBox />
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
