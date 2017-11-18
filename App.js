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
	ScrollView
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


class App extends Component<{}> {

	onFlipCard = (index) => {
		const {dispatch} = this.props

		dispatch(actionCreators.flipCard(index))
	}

	onPressNew = () => {
		const {dispatch} = this.props

		dispatch(actionCreators.newGame())
	}

	render() {
		const {cards, pairsClicked, correctPairs, selectedCards} = this.props

		return (
			<View style={styles.container}>
				<Header onPressNew={this.onPressNew}
				/>
				<Text style={styles.gameState}>
					Selected cards: {selectedCards.length}.
					Correct pairs: {correctPairs}.
					Pairs clicked: {pairsClicked}.
				</Text>
				<ScrollView style={{
					flexDirection: 'row',
					flexWrap: 'wrap',}}>
					<Card 
					list={cards}
					onFlipCard={this.onFlipCard}
					/>
				</ScrollView>
			</View>
		);
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
	}
});
