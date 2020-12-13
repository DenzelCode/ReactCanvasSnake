import { Position } from '../../vector/Position';
import { Snake } from './Snake';

export class Tail extends Position {
	constructor(public snake: Snake, x: number, y: number, width: number, height: number) {
		super(x, y, width, height);
	}

	init(): void {}

	update(): void {}

	destroy(): void {}

	isCollision(position: Position): boolean {
		return this.x === position.x && this.y === position.y;
	}
}
