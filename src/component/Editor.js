import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import './Editor.css';
import { Resizable, ResizableBox } from 'react-resizable';

/*
* Editor component
*
* Text input and code highlighting
*
*/

class Editor extends React.Component {
    /*
    * getValue()
    *
    * returns text content
    *
    */
    getValue (){
        return this.refs.textEditor.editor.getValue();
    };

    /*
    * getHeight()
    *
    * returns container element height
    *
    */
    getHeight(){
        return parseFloat(this.refs.textEditor.editor.container.parentNode.style.height
            .replace('px',''));
    }

    /*
    * render()
    *
    */
    render() {
        return (
        <ResizableBox
            height={200}
            onResize = {this.props.onResize}
            minConstraints={[100000, 100]}
            maxConstraints={[300000, 600]}>
            <AceEditor ref="textEditor"
                mode="java"
                theme="monokai"
                onChange={this.onChange}
                name="jsonEditor"
                width="100%"
                height="100%"
                editorProps={{$blockScrolling: true}}/>
        </ResizableBox>
        );
    }
}

export default Editor;
