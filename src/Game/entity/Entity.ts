import { Game } from '../Game';
import { IEntity } from './IEntity';
import { Position } from '../vector/Position';

export abstract class Entity extends Position implements IEntity {
	constructor(
		public game: Game,
		public ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number
	) {
		super(x, y, width, height);
	}

	abstract init(): void;

	abstract update(): void;

	abstract destroy(): void;

	abstract handleCollision(entity: IEntity): void;
}
