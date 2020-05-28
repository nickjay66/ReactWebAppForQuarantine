//VisibilityToggle = render, constructor, handleToggleVisibility
//visibility -> false

class Visibility extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visible: false
        }
    };


handleToggleVisibility() {
    this.setState((prevState) => {
        return {
            visible: prevState.visible === false ? true: false
        }
    });
}

render() {
    return (
    <div>
        <h1>Visibility</h1>
        <button onClick={this.handleToggleVisibility}>{this.state.visible === true ? "Hide Details": "Show Details"}</button>
        <p>{this.state.visible === true ? "Here are some details": ""}</p>
    </div>
      )
   }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));



/*
const app = {
    title: 'Visibility Toggle',
    details: '',
    buttonText: 'Show Details'
};

const showDetails = () => {
    if (app.details === '') {
        app.details = 'These are some details to pay attention to. Good work.';
        app.buttonText = 'Hide Details';
    }
    else {
        app.details = '';
        app.buttonText = 'Show Details';
    }
    renderApp();
};

const template = (
    <div>
        <h1>{app.title}</h1>
        <button onClick ={showDetails}>{app.buttonText}</button>
        <p>{app.details}</p>
    </div>
);

const appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);

const renderApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            <button onClick ={showDetails}>{app.buttonText}</button>
            <p>{app.details}</p>
        </div>
    );
ReactDOM.render(template, appRoot);
}

renderApp();
*/