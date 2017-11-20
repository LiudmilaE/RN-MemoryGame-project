/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ScrollView,
	Animated,
	Easing
} from 'react-native';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import Header from './components/Header'
import Card from './components/Card'
import { actionCreators, reducer } from './CardsRedux'

const store = createStore(reducer)

const mapStateToProps = (state) => ({
	cards: state.cards,
	selectedCards: state.selectedCards,
	pairsClicked: state.pairsClicked,
	correctPairs: state.correctPairs,
})


class App extends Component {

	constructor() {
		super()
		this.animatedValue = new Animated.Value(0)
	}

	onFlipCard = (index) => {
		const {dispatch} = this.props

		dispatch(actionCreators.flipCard(index))
	}

	onPressNew = () => {
		const {dispatch} = this.props

		dispatch(actionCreators.newGame())
	}

	animate(){
		this.animatedValue.setValue(0)
		Animated.timing(
			this.animatedValue, 
			{
				toValue: 1,
				duration: 3000,
				easing: Easing.ease,
		}).start(()=> this.animate())
	}

	componentDidMount () {
		this.animate()
	}

	render() {
		const {cards, pairsClicked, correctPairs, selectedCards} = this.props
		const spinText = this.animatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '720deg']
		})

		if(selectedCards.length===2){
			setTimeout(() => {
				this.onFlipCard(selectedCards[0].index, 300)
			})
		}
		
		if(correctPairs===12){
			return (
				<View style={styles.container}>
					<Header onPressNew={this.onPressNew}/>
					<View style={styles.container}>
						<Animated.View style={{ marginTop: 20, 
								transform: [{rotate: spinText}] }}>
							<Text style={styles.textWin}>YOU WIN!</Text>
						</Animated.View>
						<Text style={[styles.gameState, {fontSize: 35}]}>
							Correct pairs: {correctPairs}.
							Pairs clicked: {pairsClicked}.
						</Text>
					</View>
				</View>
			) 
		} else {
				return (
				<View style={styles.container}>
					<Header onPressNew={this.onPressNew}/>
					<Text style={styles.gameState}>
						Correct pairs: {correctPairs}.
						Pairs clicked: {pairsClicked}.
					</Text>
					<ScrollView style={styles.scrollContainer}>
						<Card 
							list={cards}
							onFlipCard={this.onFlipCard}/>
					</ScrollView>
				</View>
			)
		}	
	}
}

App = connect(mapStateToProps)(App)

const AppWithStore = () => (
	<Provider store={store}>
		<App />
	</Provider>
	)

export default AppWithStore

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF',
	},
	gameState: {
		fontSize: 17,
		textAlign: 'center',
	},
	scrollContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginLeft: 20,
		marginRight: 20,
		padding: 'auto',
		marginBottom: 10,
	},
	textWin: {
		fontSize: 50,
		textAlign: 'center',
		marginTop: 200,
		color: '#008080',
		alignSelf: 'center',
	},
	winSign: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 300,	
	}
});
