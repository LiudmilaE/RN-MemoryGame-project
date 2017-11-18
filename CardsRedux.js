import * as _ from 'lodash'

//the types of actions
export const types = {
	FLIP_CARD: 'FLIP_CARD',
	NEW_GAME: 'NEW_GAME',
}

//Helper functions to dispatch actions
export const actionCreators = {
	flipCard: (index) => {
		return { type: types.FLIP_CARD, payload: index}
	},
	newGame: () => {
		return { type: types.NEW_GAME, payload: true}
	}
}

const red = '#e6194b'
const green = '#3cb44b' 
const yellow = '#ffe119'
const blue = '#0082c8'
const orange = '#f58231'
const purple = '#911eb4'

const colors = [red, green, yellow, blue, orange, purple]
var cards = []

for(let i=0 ; i<colors.length ; i++) {
	for (let j=0; j<4; j++){
		cards.push({ color: colors[i], isFlipped: false})
	}
}

const cards = _.shuffle(cards)


//Initial state of the store
const initialState = {
	cards:  _.shuffle(cards),
	selectedCards: [],
	pairsClicked: 0,
	correctPairs: 0,
}

//Function to handle actions and update the state
export const reducer = (state = initialState, action) => {
	const {cards} = state
	const {type, payload} = action

	switch (type) {
		case types.FLIP_CARD: {
			return {
				...state,
				cards: cards.map((item, i) => {
					if(i === payload){
						item.isFlipped = true
					}
					return item
				}),
			}
		}
		case types.NEW_GAME: {
			return {
				...state,
				cards:  _.shuffle(cards.map((item) => {
						item.isFlipped = false
					return item
				}),),
				selectedCards: [],
				pairsClicked: 0,
				correctPairs: 0,
			}
		} 
	}

	return state
}

/*
			if (selectedCards.length === 1) {//If the user has selected a card in the last turn
				return {
					...state,
					pairsClicked: pairsClicked++,
					cards: cards.map((item, i) => {
						if(i === payload){
							item.isFlipped = !item.isFlipped
							selectedCards.push(item)
						}
						return item
					}),
				}
			} else { 
				//If the user has not selected a card in the last turn
				//  Add the card to the selectedCards array and move on
				return {
					...state,
					selectedCards: cards.filter((item, i) => {
						return i === payload
					}),
					previousCard: selectedCards[0],
					cards: cards.map((item, i) => {//FlipCard
						if(i === payload){
							item.isFlipped = true
							selectedCards.push(item)
						}
						return item
					}),
				}
			}
			*/