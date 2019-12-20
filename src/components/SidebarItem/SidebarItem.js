import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";

import styles from "./styles";
import { removeHTMLTags } from "../../helpers";
class SidebarItem extends Component {
	deleteNote = (note) => {
		if (window.confirm(`Are you sure want to delete: ${note.title}`)) {
			this.props.deleteNote(note);
		}
	};
	render() {
		const { note, index, selectedNoteIndex, selectNote, classes } = this.props;
		return (
			<div key={index}>
				<ListItem alignItems="flex-start" className={classes.listItem} selected={selectedNoteIndex === index}>
					<div className={classes.textSection} onClick={() => selectNote(note, index)}>
						<ListItemText
							primary={note.title}
							secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
						/>
					</div>
					<DeleteIcon onClick={() => this.deleteNote(note)} className={classes.deleteIcon} />
				</ListItem>
			</div>
		);
	}
	// selectNote = (note, index) => {
	// 	this.props.selectNote(note, index);
	// };
}
export default withStyles(styles)(SidebarItem);
