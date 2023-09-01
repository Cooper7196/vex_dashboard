import React from 'react';
import { GRID_START, BLOCK_SNAP_SIZE } from './App';

import { Text, Rect, Group, Circle } from 'react-konva';
import Window from './Window';

export default class Icon extends React.Component {
    state = {
        x: this.props.x,
        y: this.props.y,
        isDragging: false,
    };
    handleDragDrop = (e) => {
        if (e.target.x() > GRID_START.x) {
            this.props.setWindows([...this.props.windows, React.createElement(this.props.window, {
                x: e.target.x(),
                y: e.target.y(),
                width: this.props.width,
                height: this.props.height,
                padding: this.props.padding,
                delWindow: this.props.delWindow,
                windows: this.props.windows,
                setWindows: this.props.setWindows,
            })]);
        }
        this.setState({
            isDragging: false,
            x: this.props.x,
            y: this.props.y,
        });
    };
    handleDragMove = (e) => {
        this.setState({
            x: e.target.x(),
            y: e.target.y()
        });
    };
    handleDragStart = (e) => {
        this.setState({
            isDragging: true,
        });
    };

    render() {
        return (
            <Group
                draggable={true}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragDrop}
                onDragMove={this.handleDragMove}
                x={this.state.x}
                y={this.state.y}
            >
                {(this.state.isDragging && this.state.x > GRID_START.x && (
                    <Rect
                        x={Math.round(((this.state.x + this.props.padding) - GRID_START.x) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding - this.state.x + GRID_START.x}
                        y={Math.round(((this.state.y + this.props.padding) - GRID_START.y) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding - this.state.y + GRID_START.y}
                        fill="#444"
                        width={this.props.width * BLOCK_SNAP_SIZE - this.props.padding * 2}
                        height={this.props.height * BLOCK_SNAP_SIZE - this.props.padding * 2}
                        opacity={0.5}
                        stroke={"#0f0"}
                        strokeWidth={2}
                        dash={[20, 2]}
                        cornerRadius={16}
                    />)
                )}
                <Window
                    x={0}
                    y={0}
                    width={this.props.width}
                    height={this.props.height}
                    padding={this.props.padding}
                    title={this.props.title}
                    isIcon={true}
                >
                    {this.props.children}
                </Window>
            </Group>
        )
    }
}