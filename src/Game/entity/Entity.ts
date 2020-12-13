import { Game } from '../Game';
import { IEntity } from './IEntity';
import { Position } from '../vector/Position';

export abstract class Entity extends Position implements IEntity {
	public initialX: number;
	public initialY: number;

	constructor(
		public game: Game,
		public ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number
	) {
		super(x, y, width, height);

		this.initialX = x;
		this.initialY = y;
	}

	abstract init(): void;

	abstract update(): void;

	abstract destroy(): void;

	abstract handleCollision(entity: IEntity): void;
}
