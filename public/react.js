class Rea {
    
}

class Unregistered extends React.Component {
    render() {
        return (
            <div>
                <li><a href="/identification">Sign In</a></li>
                <li><a href="/identification">Register</a></li>
            </div>
        );
    }
}

class Register extends React.Component {
    render() {
        return (
            <div>
                <li><a>Name</a></li>
                <li><a href="/logout">Logout</a></li>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(Unregistered, null), document.getElementById('app'));

//ReactDOM.render(element, document.getElementById('app'));
//ReactDOM.render(<Hello />, document.getElementById("app"))