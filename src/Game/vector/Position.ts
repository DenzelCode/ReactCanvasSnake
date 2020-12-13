import { Game } from '../Game';

export class Position {
	constructor(public x: number, public y: number, public width: number, public height: number) {}

	isCollision(position: Position): boolean {
		return (
			this.x + this.width >= position.x &&
			this.x <= position.x + position.width &&
			this.y + this.height >= position.y &&
			this.y <= position.y + position.height
		);
	}

	static getRandomPosition(game: Game, width: number, height: number): Position {
		const position = new Position(
			Math.floor(Math.random() * (game.width / width)) * width,
			Math.floor(Math.random() * (game.height / height)) * height,
			width,
			height
		);

		if (game.getEntity(position.x, position.y) !== null) {
			return this.getRandomPosition(game, width, height);
		}

		return position;
	}
}
