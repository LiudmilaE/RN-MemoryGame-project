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
const steelBlue = '#4682B4'
const sandyBrown = '#F4A460'

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

//RULES
		//If the user has selected a card in the last turn
		//Compare the newly selected card to the previously selected card. 
		//Are they of the same type?
			//If no
			//Possibly add some styling to tell the user "Wrong Guess"
			//Flip both cards back to the "back side"
			//need to restart cards
		//If the user has not selected a card in the last turn
		//Add the card to the selectedCards array and move on


//Function to handle actions and update the state
export const reducer = (state = initialState, action) => {
	const {cards, selectedCards, pairsClicked, correctPairs} = state
	const {type, payload} = action

	switch (type) {
		case types.FLIP_CARD: {
			if(selectedCards.length<2){
				return {
					...state,
					cards: cards.map((item, i) => {
						if(i === payload && !item.isFlipped && selectedCards.length<2){
							item.isFlipped = true
							let selectItem=item
							selectItem.index = i
							selectedCards.push(selectItem)
						}
						return item
					}),
					pairsClicked: selectedCards.length===2 ? state.pairsClicked+1 : state.pairsClicked,
					correctPairs: selectedCards.length===2 && selectedCards[0].color===selectedCards[1].color ? state.correctPairs+1 : state.correctPairs,
				}
			}
			if(selectedCards.length===2){
				return {
					...state,
					cards: cards.map((item, i) => {
						if(item.isFlipped && selectedCards[0].color !== selectedCards[1].color && (i === selectedCards[0].index || i === selectedCards[1].index)){
							item.isFlipped = false
						}
						return item
					}),
					selectedCards: [],
				}
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
