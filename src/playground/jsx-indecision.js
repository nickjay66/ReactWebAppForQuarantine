console.log('App.js is running!');


//JSX - Javascript XML
var app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of the computer',
    options: []
};

//e is for form submition
//preventDefault will keep the entire app from rendering
const onFormSubmit = (e) => {
    e.preventDefault();
    //points to the event that the form started on
    const option = e.target.elements.option.value;
    //push onto array
    if (option) {
        app.options.push(option);
        //wipe input on form
        e.target.elements.option.value = '';
        renderApp();

    }
};
const onRemoveAll = () => {
    app.options = [];
    renderApp();
};

const onMakeDecision = () => {
    const rand = Math.floor(Math.random() * app.options.length);
    console.log(rand);
}

const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? `Here are your options` : 'No options'}</p>
        <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
        <button onClick={onRemoveAll}>Remove All</button>
        <ol>
        {
            app.options.map((option) => {
                return <li key={option}>{option}</li>;
            })
        }
        </ol>
        <form onSubmit={onFormSubmit}>
            <input type="text" name="option"/>
            <button>Add Option</button>
        </form>
    </div>
);

const appRoot = document.getElementById('app');
ReactDOM.render(template, appRoot);

const numbers = [55, 101, 1000];

const renderApp = () => {
    const template = (
        <div>
                <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? `Here are your options: ${app.options}` : 'No options'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            {/*
                numbers.map((number) => {
                    return <p key={number}>Number: {number}</p>;
                })
            */}
            <ol>
            {
                app.options.map((option) => {
                    return <li key={option}>{option}</li>;
                })
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
}

renderApp();