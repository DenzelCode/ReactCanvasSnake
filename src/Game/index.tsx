import { Component, createRef } from 'react';
import { Game } from './Game';
import './styles.scss';

interface Props {}
interface State {}

export class GameComponent extends Component<Props, State> {
	state = {};

	canvas = createRef<HTMLCanvasElement>();

	game: Game;

	componentDidMount() {
		this.game = new Game(this.canvas.current);

		this.game.init();
	}

	componentWillUnmount() {
		this.game.destroy();
	}

	render() {
		return <canvas ref={this.canvas}></canvas>;
	}
}
