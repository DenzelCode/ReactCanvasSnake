import { Direction } from '../../key/Direction';
import { Entity } from '../Entity';
import { IEntity } from '../IEntity';
import { Key } from '../../key/Key';
import { Tail } from './Tail';
import { Position } from '../../vector/Position';

export class Snake extends Entity {
	private tails: Tail[] = [];
	private speed: number;
	private direction: Direction = Direction.UNKNOWN;
	private initialTails = 10;

	private keyEvent = (event: KeyboardEvent) => {
		if (!!~Key.UP.indexOf(event.key) && this.direction !== Direction.DOWN) {
			event.preventDefault();

			this.direction = Direction.UP;
		}

		if (!!~Key.DOWN.indexOf(event.key) && this.direction !== Direction.UP) {
			event.preventDefault();

			this.direction = Direction.DOWN;
		}

		if (!!~Key.RIGHT.indexOf(event.key) && this.direction !== Direction.LEFT) {
			event.preventDefault();

			this.direction = Direction.RIGHT;
		}

		if (!!~Key.LEFT.indexOf(event.key) && this.direction !== Direction.RIGHT) {
			event.preventDefault();

			this.direction = Direction.LEFT;
		}
	};

	init(): void {
		this.reset();

		window.addEventListener('keydown', this.keyEvent);
	}

	addInitialTails(): void {
		this.tails.splice(0, this.tails.length);

		this.addTails(this.initialTails);
	}

	addTails(amount: number): void {
		for (let i = 0; i < amount; i++) {
			this.addTail();
		}
	}

	getMovement(): [direction: 'x' | 'y', speed: number] {
		return [
			this.direction === Direction.UP || this.direction === Direction.DOWN ? 'y' : 'x',
			(this.direction === Direction.UP || this.direction === Direction.LEFT
				? -1
				: this.direction === Direction.DOWN || this.direction === Direction.RIGHT
				? 1
				: 0) * this.speed,
		];
	}

	getHead(): Tail {
		return this.tails[0];
	}

	update(): void {
		const head = this.tails[0];

		if (head == null) return;

		this.ctx.fillStyle = '#2c3e50';

		const movement = this.getMovement();

		for (let i = this.tails.length; i >= 0; i--) {
			const current = this.tails[i];
			const next = this.tails[i - 1];

			if (next == null || current == null || current === head) continue;

			current.x = Math.floor(next.x);
			current.y = Math.floor(next.y);

			this.ctx.fillRect(current.x, current.y, current.width, current.height);
		}

		head[movement[0]] += movement[1];

		this.x = Math.floor(head.x);
		this.y = Math.floor(head.y);

		this.ctx.fillStyle = '#e74c3c';
		this.ctx.fillRect(head.x, head.y, head.width, head.height);

		this.collision();
	}

	addTail(): void {
		const dir = {
			x: this.x - this.width * this.tails.length,
			y: this.x - this.width * this.tails.length,
		};

		const movement = this.getMovement();

		const lastTail = this.tails[this.tails.length - 1];

		if (lastTail != null) {
			dir[movement[0]] = lastTail[movement[0]] + -movement[1];
		}

		this.tails.push(new Tail(this, dir.x, dir.y, this.width, this.height));
	}

	getTails(): Tail[] {
		return this.tails;
	}

	collision(): void {
		if (
			this.x + this.width < 0 ||
			this.x + this.width > this.game.width ||
			this.y + this.height < 0 ||
			this.y + this.height > this.game.height
		) {
			this.handleCollision(this);

			return;
		}

		for (const entity of this.game.getEntities()) {
			if (entity instanceof Snake) {
				if (this === entity && entity.getTails().length < entity.initialTails + 1) {
					continue;
				}

				for (const tail of entity.getTails()) {
					if (tail.isCollision(entity) && tail !== entity.getHead()) {
						entity.handleCollision(this);

						return;
					}
				}

				continue;
			}

			if (entity instanceof Position && this.isCollision(entity)) {
				entity.handleCollision(this);
			}
		}
	}

	handleCollision(entity: IEntity) {
		if (entity instanceof Snake) {
			this.game.reset();
		}
	}

	destroy(): void {
		this.reset();

		window.removeEventListener('keydown', this.keyEvent);
	}

	reset(): void {
		this.direction = Direction.UNKNOWN;
		this.speed = 5;
		this.x = this.initialX;
		this.y = this.initialY;
		this.addInitialTails();
		this.update();
	}
}
