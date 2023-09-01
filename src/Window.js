import React from 'react';
import { GRID_START, BLOCK_SNAP_SIZE } from './App';

import { Text, Rect, Group, Circle } from 'react-konva';

class Window extends React.Component {

    state = {
        x: this.props.x + this.props.padding,
        y: this.props.y + this.props.padding,
        width: this.props.width * BLOCK_SNAP_SIZE - this.props.padding * 2,
        height: this.props.height * BLOCK_SNAP_SIZE - this.props.padding * 2,
        isDragging: false,
        isScaling: false,
    };

    handleDragStart = (e) => {
        this.setState({
            isDragging: true,
        });
    };

    handleDragEnd = (e) => {
        let roundedPos = this.roundPos(this.state);
        this.setState({
            isDragging: false,
            x: roundedPos.x,
            y: roundedPos.y,
        });
        if (this.state.x < GRID_START.x) {
            // Delete Window
        }
    };

    handleDragMove = (e) => {
        this.setState({
            x: e.target.x(),
            y: e.target.y()
        });
    };

    handleDblClick = (e) => {
        console.log(e);
    };

    cornerMouseOver = (e) => {
        // Set cursor to resize
        let cursor = "default";
        switch (e.target.id()) {
            case "brCorner":
                cursor = "se-resize";
                break;
            case "tlCorner":
                cursor = "nw-resize";
                break;
            case "trCorner":
                cursor = "ne-resize";
                break;
            case "blCorner":
                cursor = "sw-resize";
                break;
            default:
                break;
        };

        document.body.style.cursor = cursor;
    };
    cornerMouseOut = (e) => {
        // Set cursor to default
        document.body.style.cursor = "default";
    };

    cornerDragStart = (e) => {
        this.setState({
            isScaling: true,
        });
    };

    roundPos(pos) {
        return {
            x: Math.round((pos.x - GRID_START.x) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding + GRID_START.x,
            y: Math.round((pos.y - GRID_START.y) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding + GRID_START.y,
        };
    }

    cornerDragMove = (e) => {
        let roundedPos = this.roundPos(this.state);
        let nextX = (BLOCK_SNAP_SIZE * 4 - this.props.padding * 2 === this.state.width) ? roundedPos.x : e.target.x();
        let nextY = (BLOCK_SNAP_SIZE * 4 - this.props.padding * 2 === this.state.height) ? roundedPos.y : e.target.y();
        switch (e.target.id()) {
            case "brCorner":
                this.setState({
                    width: e.target.x() - this.state.x,
                    height: e.target.y() - this.state.y
                });
                break;
            case "tlCorner":
                this.setState({
                    x: nextX,
                    y: nextY,
                    width: this.state.width - (e.target.x() - this.state.x),
                    height: this.state.height - (e.target.y() - this.state.y)
                });
                break;
            case "trCorner":
                this.setState({
                    y: nextY,
                    width: e.target.x() - this.state.x,
                    height: this.state.height - (e.target.y() - this.state.y)
                });
                break;
            case "blCorner":
                this.setState({
                    x: nextX,
                    width: this.state.width - (e.target.x() - this.state.x),
                    height: e.target.y() - this.state.y
                });
                break;
            default:
                break;
        };

        this.setState({
            width: Math.max(BLOCK_SNAP_SIZE * 4 - this.props.padding * 2, this.state.width),
            height: Math.max(BLOCK_SNAP_SIZE * 4 - this.props.padding * 2, this.state.height),
        });
    };

    cornerDragEnd = (e) => {
        let roundedPos = this.roundPos(this.state);
        this.setState({
            isScaling: false,
            height: Math.round((this.state.height + this.props.padding) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) - this.props.padding * 2,
            width: Math.round((this.state.width + this.props.padding) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) - this.props.padding * 2,
            x: roundedPos.x,
            y: roundedPos.y,
        });

        // Force Rerender
        this.setState({
            x: this.state.x + 1,
            y: this.state.y + 1,
        });
        this.setState({
            x: this.state.x - 1,
            y: this.state.y - 1,
        });
    };

    render() {
        const children = React.cloneElement(this.props.children, {
            width: this.state.width,
            height: this.state.height - BLOCK_SNAP_SIZE,
        });
        return (
            <>
                <Group
                    x={this.state.x}
                    y={this.state.y}
                    onDblClick={this.handleDblClick}
                >
                    {(this.state.isDragging || this.state.isScaling) && this.state.x > GRID_START.x && (
                        <Rect
                            x={Math.round((this.state.x - GRID_START.x) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding - this.state.x + GRID_START.x}
                            y={Math.round((this.state.y - GRID_START.y) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) + this.props.padding - this.state.y + GRID_START.y}
                            fill="#444"
                            width={Math.max(BLOCK_SNAP_SIZE * 4 - this.props.padding * 2, Math.round((this.state.width + this.props.padding) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) - this.props.padding * 2)}
                            height={Math.max(BLOCK_SNAP_SIZE * 4 - this.props.padding * 2, Math.round((this.state.height + this.props.padding) / (BLOCK_SNAP_SIZE * 4)) * (BLOCK_SNAP_SIZE * 4) - this.props.padding * 2)}
                            opacity={0.5}
                            stroke={"#0f0"}
                            strokeWidth={2}
                            dash={[20, 2]}
                            cornerRadius={16}
                        />
                    )}
                    <Rect
                        fill="#1C1C1C"
                        width={this.state.width}
                        height={this.state.height}
                        shadowOffset={{ x: 2, y: 2 }}
                        shadowBlur={5}
                        cornerRadius={16}
                    />
                    <Group x={0} y={BLOCK_SNAP_SIZE}>
                        {children}
                    </Group>
                </Group>
                <Group x={this.state.x}
                    y={this.state.y} draggable={!this.state.isScaling}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                    onDragMove={this.handleDragMove}>
                    <Rect
                        fill="#E94B4B"
                        width={this.state.width}
                        height={BLOCK_SNAP_SIZE}
                        cornerRadius={[16, 16, 0, 0]}
                    />
                    <Text x={35} y={10} text={this.props.title} fill="#fff" fontSize={20} />
                    <GrabbableIcon x={10} y={10} width={6} height={6} padding={1} />
                </Group>
                {/* Corner Drag Circles */}
                <Circle draggable id="brCorner" x={this.state.x + this.state.width} y={this.state.y + this.state.height} radius={20} onDragEnd={this.cornerDragEnd} onDragStart={this.cornerDragStart} onDragMove={this.cornerDragMove} onClick={this.handleDblClick} onMouseOver={this.cornerMouseOver} onMouseOut={this.cornerMouseOut} />
                <Circle draggable id="trCorner" x={this.state.x + this.state.width} y={this.state.y} radius={20} onDragEnd={this.cornerDragEnd} onDragStart={this.cornerDragStart} onDragMove={this.cornerDragMove} onClick={this.handleDblClick} onMouseOver={this.cornerMouseOver} onMouseOut={this.cornerMouseOut} />
                <Circle draggable id="blCorner" x={this.state.x} y={this.state.y + this.state.height} radius={20} onDragEnd={this.cornerDragEnd} onDragStart={this.cornerDragStart} onDragMove={this.cornerDragMove} onClick={this.handleDblClick} onMouseOver={this.cornerMouseOver} onMouseOut={this.cornerMouseOut} />
                <Circle draggable id="tlCorner" x={this.state.x} y={this.state.y} radius={20} onDragEnd={this.cornerDragEnd} onDragStart={this.cornerDragStart} onDragMove={this.cornerDragMove} onClick={this.handleDblClick} onMouseOver={this.cornerMouseOver} onMouseOut={this.cornerMouseOut} />
            </>
        );
    }
}

function GrabbableIcon({ x, y, width, height, padding }) {
    let grid = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            grid.push(
                <Rect
                    key={"x" + i + "y" + j}
                    x={x + i * width + padding}
                    y={y + j * height + padding}
                    width={width - padding * 2}
                    height={height - padding * 2}
                    cornerRadius={2}
                    opacity={0.75}
                    fill="#fff"
                />)
        }
    }
    return grid;
}

export default Window;