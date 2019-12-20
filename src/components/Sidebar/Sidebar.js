import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";

import styles from "./styles";
import SidebarItem from "../SidebarItem/SidebarItem";

class Sidebar extends Component {
	state = {
		addingNote: false,
		title: null
	};
	addNewNote = () => {
		this.setState((prevState, props) => ({
			title: null,
			addingNote: !prevState.addingNote
		}));
		console.log("Look Adding new Notes 😎😅😅");
	};
	handleChange = (e) => {
		this.setState({
			title: e.target.value
		});
		// console.log("This is the title: ", e.target.value);
	};
	handleSubmit = (e) => {
		e.preventDefault();
		// console.log("Title is added as ", this.state.title);
		this.setState({
			title: null,
			addingNote: false
		});
		this.props.addNewNote(this.state.title);
	};
	selectNote = (note, index) => {
		this.props.selectNote(note, index);
	};
	deleteNote = (note) => {
		this.props.deleteNote(note)
	};
	render() {
		const { classes, selectedNoteIndex, notes } = this.props;
		const { addingNote, title } = this.state;
		return (
			<div className={classes.sidebarContainer}>
				<Button onClick={this.addNewNote} className={classes.newNoteBtn}>
					{addingNote ? "Cancel Note" : "New Note"}
				</Button>

				{addingNote && (
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							className={classes.newNoteInput}
							name="title"
							placeholder="Enter Title"
							onChange={this.handleChange}
						/>
						<Button type="submit" className={classes.newNoteSubmitBtn}>
							Add New Note
						</Button>
					</form>
				)}

				<List>
					{notes &&
						notes.map((note, index) => (
							<div key={index}>
								<SidebarItem
									note={note}
									index={index}
									selectedNoteIndex={selectedNoteIndex}
									selectNote={this.selectNote}
									deleteNote={this.deleteNote}
								/>
								<Divider />
							</div>
						))}
				</List>
			</div>
		);
	}
}

export default withStyles(styles)(Sidebar);
