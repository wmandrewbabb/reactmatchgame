import React, { Component } from 'react';
import MonsterCard from '../MonsterCard';
import images from "../../images.json";
import "./Gamefield.css";

// this is the component our game logic resides in

class Gamefield extends Component {

	//initial state set
	state = {
		images,
		message: "Click a monster to begin!",
		score: 0,
		bestScore: 0
	};
	
	//figure out what happens when a monster is clicked

	handleClick = (id, clicked) => {

		//I'm not very good at remembering to use "const" and "let" >_>
		const imageArray = this.state.images;

		if (clicked) {
			imageArray.forEach((image, arrayIndex) => {
				imageArray[arrayIndex].clicked = false;
			});
			return this.setState({
				image: imageArray.sort(() => Math.random() - 0.5),
				message: "You already picked that one!",
				score: 0
			})
		}
		else {
			imageArray.forEach((image, arrayIndex) => {
				if (id === image.id) {
					imageArray[arrayIndex].clicked = true;
				}
			});

			const { bestScore, score } = this.state;
			const newScore = score + 1;
			const newBestScore = newScore > bestScore ? newScore : bestScore;

			//Restarts the game if all 16 are picked

			if (newScore === 16) {
				imageArray.forEach((image, arrayIndex) => {
					imageArray[arrayIndex].clicked = false;
				});
				return this.setState({
					image: imageArray.sort(() => Math.random() - 0.5),
					message: "You've picked all the monsters! Good job!",
					score: 0,
					bestScore: newBestScore,
				})
			}

			//Increments score if not

			return this.setState({
				image: imageArray.sort(() => Math.random() - 0.5),
				message: "You Guessed Correctly!",
				score: newScore,
				bestScore: newBestScore,
			})
		}
	};

	//Renders our HTML and MonsterCard Component
	render() {
		return (
			<div className="container-fluid mainCardContainer">
			<div className="gameMessage text-center">
						<p>{this.state.message}</p>
					</div>
					<div className="gameScores text-center">
						<p>Score: {this.state.score} ● Best Score: {this.state.bestScore}</p>
					</div>
				<div className="container">
					
					<div className="row">
					{this.state.images.map(image => (

						<MonsterCard
							key={image.id}
							id={image.id}
							name={image.name}
							clicked={image.clicked}
							image={image.image}
							handleClick={this.handleClick}
						/>

					))}

					</div>
				</div>
			</div>
		);
	}
};

export default Gamefield;