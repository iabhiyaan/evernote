import React, { Component } from "react";

import { db, timestamp } from "./firebase";
import Editor from "./components/Editor/Editor";
import Sidebar from "./components/Sidebar/Sidebar";

import "./App.css";

class App extends Component {
	state = {
		notes: null,
		selectedNoteIndex: null,
		selectedNote: null
	};
	componentDidMount() {
		db.collection("/notes").onSnapshot((snapShot) => {
			const notes = snapShot.docs.map((doc) => {
				const data = doc.data();
				data["id"] = doc.id;
				return data;
			});
			this.setState({ notes });
		});
	}
	selectNote = (note, index) => {
		this.setState({
			selectedNote: note,
			selectedNoteIndex: index
		});
	};

	noteUpdate = (id, noteObj) => {
		db.collection("/notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timestamp
		});
	};

	addNewNote__Fn = async (title) => {
		console.log("added__title is", title);
		const dataNote__Obj = {
			title,
			body: ""
		};
		const newFromDB = await db.collection("/notes").add({
			title: dataNote__Obj.title,
			body: dataNote__Obj.body,
			timestamp
		});
		const newId = newFromDB.id;
		console.log(newId);
		await this.setState((prevState) => {
			return {
				notes: [ ...prevState.notes, dataNote__Obj ]
			};
		});
		const newNoteIndex = this.state.notes && this.state.notes.findIndex((note) => note.id === newId);
		this.setState((prevState) => ({
			selectedNote: prevState.notes[newNoteIndex],
			selectedNoteIndex: newNoteIndex
		}));
		// console.log(newNoteIndex);
	};
	resetSelectThings__Fn = () => {
		this.setState({
			...this.state,
			selectedNote: null,
			selectedNoteIndex: null
		});
	};
	deleteNote__Fn = async (note) => {
		const { notes, selectedNoteIndex } = this.state;
		const noteObjIndex = this.state.notes && this.state.notes.indexOf(note);
		console.log(note, noteObjIndex);

		const updatedNotes = this.state.notes.filter((n) => n.id !== note.id);
		await this.setState({
			notes: updatedNotes
		});

		if (notes.length === 1) {
			if (selectedNoteIndex === 0 && noteObjIndex === 0) {
				await this.setState({
					selectedNote: null,
					selectedNoteIndex: null
				});
			}
		} else if (notes.length > 1) {
			if (selectedNoteIndex > noteObjIndex) {
				this.setState({
					...this.state,
					selectedNoteIndex: selectedNoteIndex - 1,
					selectedNote: notes[selectedNoteIndex]
				});
			} else if (selectedNoteIndex === 0 && noteObjIndex === 0) {
				this.setState({
					selectedNoteIndex: selectedNoteIndex,
					selectedNote: notes[selectedNoteIndex + 1]
				});
			} else if (selectedNoteIndex === noteObjIndex) {
				this.setState({
					selectedNoteIndex: selectedNoteIndex - 1,
					selectedNote: notes[selectedNoteIndex - 1]
				});
			} else {
				this.setState({
					...this.state,
					selectedNoteIndex: selectedNoteIndex,
					selectedNote: notes[selectedNoteIndex]
				});
			}
		} else {
			await this.setState({
				...this.state,
				selectedNote: null,
				selectedNoteIndex: null
			});
		}
		db.collection("/notes").doc(note.id).delete();
	};
	render() {
		const { notes, selectedNote, selectedNoteIndex } = this.state;
		return (
			<div className="app-container">
				<Sidebar
					selectedNoteIndex={selectedNoteIndex}
					selectNote={this.selectNote}
					notes={notes}
					addNewNote={this.addNewNote__Fn}
					deleteNote={this.deleteNote__Fn}
				/>
				{selectedNote && <Editor selectedNote={selectedNote} notes={notes} noteUpdate={this.noteUpdate} />}
			</div>
		);
	}
}

export default App;
