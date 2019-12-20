import React, { Component } from "react";
import ReactQuill from "react-quill";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";

import debounce from "../../helpers";
import styles from "./styles";

class Editor extends Component {
	state = {
		text: "",
		title: "",
		id: ""
	};

	componentDidMount() {
		const { id, title, body } = this.props.selectedNote;
		this.setState({
			text: body,
			title,
			id
		});
	}
	componentDidUpdate() {
		// console.log(this.state);
		if (this.props.selectedNote.id !== this.state.id) {
			const { id, title, body } = this.props.selectedNote;
			this.setState({
				text: body,
				title,
				id
			});
		}
		console.log(`How was the state updated ? ${this.state.title}`);
		console.log(`What why is ${this.props.selectedNote.title} comming ?`);
	}

	update = debounce(() => {
		const { noteUpdate } = this.props;
		const { text, title, id } = this.state;
		noteUpdate(id, { body: text, title });
	}, 1200);

	updateBody = async (val) => {
		await this.setState({ text: val });
		this.update();
	};
	handleChange = (e) => {
		this.setState({
			title: e.target.value
		});
		this.update();
	};
	render() {
		const { classes } = this.props;
		const { text, title, id } = this.state;
		return (
			<div className={classes.editorContainer}>
				<BorderColorIcon className={classes.editIcon} />
				<input
					className={classes.titleInput}
					placeholder="Note title..."
					value={title}
					name="title"
					onChange={this.handleChange}
				/>
				<ReactQuill value={text} onChange={this.updateBody} />
			</div>
		);
	}
}
export default withStyles(styles)(Editor);
