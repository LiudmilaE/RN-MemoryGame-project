import React, { Component } from 'react'
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	Animated,
	View
} from 'react-native'
import * as Animatable from 'react-native-animatable'
//import FlipCard from 'react-native-flip-card'


// Wrap a component to make it animatable
//const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const animations = ['flipInY', 'flipOutY']

export default class Card extends Component {

	state = {
		animationFront: animations[0],
		animationBack: animations[1],
		}

	renderCard = (card, i) => {
		const {onFlipCard} = this.props

		return (
			<TouchableOpacity
				onPress={() => onFlipCard(i)}
				style={styles.cards}
				key={i}
				>
				<View
					style={[
						{backgroundColor: card.color,},
						styles.cardFront, 
						!card.isFlipped && {display: 'none'}
						]}>
				</View>
				<View
					style={[ 
						styles.cardBack, 
						card.isFlipped && {display: 'none'}]}>
				</View>
			</TouchableOpacity>
		)
	}

	render() {
		const {list} = this.props

		return (
			<View style={{
					display: 'flex',
					flexWrap: 'wrap',}}>
			{list.map(this.renderCard)}
			</View>
		)


		//const {animationFront, animationBack, isFlipped } = this.state

		// onFlipCard= () => {
		// 	this.state.isFlipped = !isFlipped
		// }

		// return (
		// 	<View>
		// 	<TouchableOpacity
		// 		onPress={this.flipCard}
		// 		style={styles.card}>
		// 		<Animatable.View
		// 			animation={animationFront}
		// 			delay={500}
		// 			style={ !isFlipped ? styles.cardFront : {display: 'none'}}>
		// 			<Text>1</Text>
		// 			</Animatable.View>
		// 		<Animatable.View
		// 			animation={animationBack}
		// 			delay={500}
		// 			style={ isFlipped ? styles.cardBack : {display: 'none'}}>
		// 			<Text>2</Text> 
		// 			</Animatable.View>
		// 	</TouchableOpacity>
		// 	<View style={styles.card}>
		// 		<FlipCard>
		// 			<View style={styles.face}>
		// 				<Text>The Face</Text>
		// 			</View>
		// 			<View style={styles.back}>
		// 				<Text>The Face</Text>
		// 			</View>
		// 		</FlipCard>
		// 	</View>
		// 	</View>
		// 	)
	}
}

const styles = StyleSheet.create({
	cards: {
		margin: 5,
		borderWidth: 1,
		borderColor: '#000080',
		width: 80,
		height: 80,
		borderRadius: 40,
		flexGrow: 1,
	},
	cardFront: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: '#000080',
		borderRadius: 40,
	},
	cardBack: {
		backgroundColor: '#000080',
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: '#000080',
		borderRadius: 40,
	},
})