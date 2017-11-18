import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet
} from 'react-native'

export default class Header extends Component {

	render () {
		const {onPressNew} = this.props

		return (
			<View style={styles.header}>
				<View style={{width: '60%'}}>
					<Text style={styles.title}>Memory Game</Text>
				</View>
				<TouchableOpacity style={styles.button}
					onPress={() => onPressNew()}>
					<Text style={styles.textButton}>New Game</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'teal',
		display: 'flex',
		flexDirection: 'row',
		padding: 2,
	},
	title: {
		textAlign: 'center',
		marginBottom: 5,
		padding: 15,
		color: 'white',
		fontSize: 20,
		flexGrow: 1,
	},
	button: {
		borderWidth: 3,
		borderColor: 'white',
		marginLeft: 15,
		alignSelf: 'flex-end',
		borderRadius: 15,
	},
	textButton: {
		textAlign: 'center',
		marginBottom: 5,
		padding: 15,
		color: 'white',
		fontSize: 18,
		flexGrow: 1,
	},
})