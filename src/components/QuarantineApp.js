import React from 'react';
import Add from './Add';
import AutoPop from './Autopop';
import Options from './Options'
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class QuarantineApp extends React.Component {
    state = {
        options: [],
        compOptions: ['Start a new book', 'Go for a run', 'Draw a picture', 
        'Send positive vibes via social media', 'Cook something with ingredients you already have',
        'Learn an instrument (if you have one)', 'Write a poem', 'Do 20 push-ups! Hoorah!', 'Garden',
        'Close your eyes and focus on your breath for 5-minutes'],
        selectedOption: undefined
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
    
    handleDeleteOptions = () => {
        this.setState(() => ({options: []} ));
    }

    //remove individual option
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    //Picks random choice
    handlePick = () => {
        const rand = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[rand];
        this.setState(() => ({selectedOption: option}));
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
            }
        this.setState((prevState) => ({options: prevState.options.concat([option])}))
    };

    handlePopulateOptions = () => {
        this.setState((prevState) => ({options: prevState.options.concat(this.state.compOptions)}))
    };

    handleClearOption = () => {
        this.setState(() => ({selectedOption: undefined}));
    }
            
    render() {
        const title = "Quarantine: Challenge Yourself!";
        const subTitle = "Find Something New To Do Today While Stuck At Home";

        return (
            <div className="container__background">
                <Header title={title} subTitle={subTitle} />
                    <div className="container">
                     <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
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
                    </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearOption={this.handleClearOption}
                />
            </div>
        );
    }
}



export default QuarantineApp;