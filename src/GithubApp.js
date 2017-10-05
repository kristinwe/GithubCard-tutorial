import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Card = (props) => {
    return (
        <div>
            <img width="75" src={props.avatar_url} />
            <div>
                <div>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

const CardList = (props) => {
    return (
        <div>
          {props.cards.map(card => <Card key={card.id} {...card} />)}
        </div>
    );
}

class Form extends React.Component {
    state = {userName: ''}
    handleSubmit = (event) => {
        event.preventDefault();
        axios.get('https://api.github.com/users/'+this.state.userName)
        // params: {
        //     login: {this.state.userName}
        // })
        //axios.get('https://api.github.com/users/mojombo')
        .then(resp => {
            this.props.onSubmit(resp.data);
            this.setState({ userName: '' });
        })
    };

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                value = {this.state.userName}
                onChange={(event) => this.setState({ userName: event.target.value })}
                placeholder="Github username" required/>
                <button type="submit">Add card </button>
                <button>{this.state.userName}</button>
            </form>
        );
    }
}


export default class GithubApp extends React.Component {
    state = {
        cards: []
    };

    addNewCard = (cardInfo) => {
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewCard} />
                <CardList cards={this.state.cards}/>
            </div>
        );
    }
}

ReactDOM.render(<GithubApp />, document.getElementById('root'));