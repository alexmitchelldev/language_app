import React from 'react';

class FlipCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isFlipped: false
      };
    }
  
    handleFlip = () => {
      this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }
  
    render() {
        const { isFlipped } = this.state;
        return (
          <div className="flashcard">
            {isFlipped ? (
              <div className="card">
                <div className="back">
                  <h1 className="title">Front Title</h1>
                  <p className="description">Front Description</p>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="front">
                  <h1 className="title">Back Title</h1>
                  <p className="description">Back Description</p>
                </div>
              </div>
            )}
            <button className="flip-button" onClick={this.handleFlip}>Flip</button>
          </div>
        );
      }
  }

  export default FlipCard;
  