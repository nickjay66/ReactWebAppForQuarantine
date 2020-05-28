//stateless functional component


class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handlePopulateOptions = this.handlePopulateOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: [],
            compOptions: ['Start a new book', 'Go for a run', 'Draw a picture', 
                          'Send positive vibes via social media', 'Cook something with ingredients you already have',
                          'Learn an instrument (if you have one)', 'Write a poem', 'Do 20 push-ups! Hoorah!', 'Garden',
                          'Close your eyes and focus on your breath for 5-minutes']
        };
    }

    //LifeCycle methods - can only be used in class component
    componentDidMount() {
        try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);

        if (options) {
            this.setState(() => ({ options }));
        };

        } catch (e) {
            //Do nothing at all
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    
    handleDeleteOptions() {
        this.setState(() => ({options: []} ));
    }

    //remove individual option
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    //Picks random choice
    handlePick() {
        let rand = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[rand]);
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
            }
        this.setState((prevState) => ({options: prevState.options.concat([option])}))
    };

    handlePopulateOptions() {
        this.setState((prevState) => ({options: prevState.options.concat(this.state.compOptions)}))
    };
            
    render() {
        const title = "Quarantine Challenge";
        const subTitle = "Find Something New To Do Today While Stuck Inside";

        return (
            <div>
                <Header title={title} subTitle={subTitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <Add 
                    handleAddOption={this.handleAddOption}
                />
                <AutoPop handlePopulateOptions={this.handlePopulateOptions}/>
            </div>
        );
    }
}


//use stateless component when possible. Better for speed.
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h1>{props.subTitle}</h1>
        </div>
    );
};
//Gives a default if no prop is provided
Header.defaultProps = {
    title: 'Quarantine Challenge'
}

const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
                >What should I do?
            </button>
        </div>
    );
};
/*
class Action extends React.Component { 
   render() {
        return (
            <div>
                <button 
                    onClick={this.props.handlePick}
                    disabled={!this.props.hasOptions}
                    >What should I do?
                    </button>
            </div>
        )
    }
}
*/

const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions}>Remove all</button>
        {props.options.length === 0 && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                <Option key={option} 
                optionText={option} 
                handleDeleteOption={props.handleDeleteOption}/>)
                )
            }
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}>remove</button>
        </div>
    );
}

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {error};
        });

        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}

const AutoPop = (props) => {
    return (
        <div>
            <button onClick={props.handlePopulateOptions}>Need some ideas?</button>
        </div>
    );
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));