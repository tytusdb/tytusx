import React, { Component } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/xquery/xquery'
import 'codemirror/mode/clike/clike'
import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default class Editor extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            open: true,
            language: this.props.language,
            displayName: this.props.displayName,
            value: this.props.value,
            onChange: this.props.onChange,
        }
    }

    handleChange = (editor, data, value) => {
        //console.log(value);
        this.props.onChange(value)
    }
    
    render() {
        return (
            <div className={`editor-container`}>
                <div className="editor-title">
                    {this.state.displayName}
                    <button
                    type="button"
                    className="expand-collapse-btn"
                    onClick={() => this.setState({open: !this.state.open})}
                    >
                    <FontAwesomeIcon icon={this.state.open ? faCompressAlt : faExpandAlt} />
                    </button>
                </div>
                <ControlledEditor
                    onBeforeChange={this.handleChange}
                    value={this.props.value}
                    className="code-mirror-wrapper"
                    options={{
                    lineWrapping: true,
                    lint: true,
                    mode: this.props.language,
                    theme: 'material',
                    lineNumbers: true
                    }}
                />
            </div>
        )
    }
}
