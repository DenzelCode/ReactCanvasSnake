export interface IEntity {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	width: number;
	height: number;

	init?(): void;

	update?(): void;

	destroy?(): void;

	handleCollision?(entity: IEntity): void;
}
