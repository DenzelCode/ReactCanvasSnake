import { Entity } from '../Entity';
import { Game } from '../../Game';
import { IEntity } from '../IEntity';
import { Snake } from '../snake/Snake';
import { Position } from '../../vector/Position';

export class Food extends Entity {
	constructor(
		game: Game,
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		public color: string,
		public score: number,
		public tails: number,
		public timeout: number
	) {
		super(
			game,
			ctx,
			Position.getRandomPosition(game, width, height).x,
			Position.getRandomPosition(game, width, height).y,
			width,
			height
		);
	}

	teleportRandomPosition() {
		const position = Position.getRandomPosition(this.game, this.width, this.height);

		this.x = position.x;
		this.y = position.y;
	}

	init(): void {
		this.update();
	}

	update(): void {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	destroy(): void {}

	handleCollision(entity: IEntity): void {
		if (entity instanceof Snake) {
			this.teleportRandomPosition();

			this.game.addScore(this.score);

			entity.addTails(this.tails);
		}
	}
}
