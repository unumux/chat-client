// Main JS should go here!
// Include scripts using Browserify by doing:
// var $ = require('jquery');
var io = require('socket.io-client');
var socket = io('carl.local:4000');

var React = require('react');


var MessageBox = React.createClass({
    sendMessage: function() {
            socket.emit('message', {message: this.refs.message.getDOMNode().value})
    },
    render: function() {
        return (
            <div>
                <textarea ref="message"></textarea>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
});

var MessageList = React.createClass({
    getInitialState: function() {
        return {
            messages: []
        };
    },
    componentDidMount: function() {
        socket.on('message', (data) => {
            this.setState({
                messages: this.state.messages.concat([data])
            });
        });
    },
    render: function() {
        return (
            <ul>
                {this.state.messages.map(function(message) {
                    return <li>{message.message}</li>
                })}
            </ul>
        )
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div>
                <MessageList />
                <MessageBox />
            </div>
        )
    }
});

React.render(<App />, document.body);
