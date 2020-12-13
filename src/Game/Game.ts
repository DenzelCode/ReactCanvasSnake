import { Food } from './entity/food/Food';
import { Snake } from './entity/snake/Snake';
import { IEntity } from './entity/IEntity';

export class Game {
	protected ctx: CanvasRenderingContext2D;
	public width = 500;
	public height = 500;
	protected interval: number;
	protected score = 0;
	public grid = 20;
	public pause = false;

	protected entities: IEntity[] = [];

	constructor(protected canvas: HTMLCanvasElement) {
		this.ctx = canvas.getContext('2d');
	}

	init(): void {
		this.pause = false;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.initEntities();

		this.scheduleUpdate();
	}

	destroy(): void {
		this.score = 0;
		this.pause = true;

		for (const entity of this.entities) {
			entity.destroy();
		}

		this.cancelInterval();

		this.entities.splice(0, this.entities.length);

		this.update();
	}

	reset(): void {
		this.destroy();
		this.init();
	}

	initEntities(): void {
		this.addEntity(new Food(this, this.ctx, this.grid, this.grid, '#2ecc71', 1, 5, null));

		this.addEntity(
			new Snake(this, this.ctx, this.width / 2, this.height / 2, this.grid, this.grid)
		);
	}

	addEntity(entity: IEntity) {
		this.entities.push(entity);

		entity.init();
	}

	getEntity(x: number, y: number) {
		for (const entity of this.entities) {
			if (entity.x === x && entity.y === y) return entity;

			if (entity instanceof Snake) {
				for (const tail of entity.getTails()) {
					if (tail.x === x && tail.y === y) return tail;
				}
			}
		}

		return null;
	}

	update(): void {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		for (const entity of this.entities) {
			entity.update();
		}

		this.ctx.fillStyle = '#000';
		this.ctx.font = '20px Georgia';
		this.ctx.fillText(`Score: ${this.score}`, this.width - 80, 20);
	}

	scheduleUpdate(): void {
		this.update();

		if (this.pause === false) {
			if (this.interval != null) {
				this.cancelInterval();
			}

			this.interval = requestAnimationFrame(() => this.scheduleUpdate());
		}
	}

	cancelInterval() {
		cancelAnimationFrame(this.interval);

		this.interval = null;
	}

	getEntities(): IEntity[] {
		return this.entities;
	}

	getScore(): number {
		return this.score;
	}

	increaseScore(): void {
		this.score++;
	}

	addScore(score: number): void {
		this.score += score;
	}

	resetScore(): void {
		this.score = 0;
	}
}
