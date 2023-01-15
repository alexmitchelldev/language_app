import EditCard from "./EditCard";
import React from "react";

const MAX_TAGS_TO_DISPLAY = 4;

const tags = {
  "french comprehensible input": {
    color: {
      background: "bg-red-300",
      text: "text-red-600",
    },
  },
  beginner: {
    color: {
      background: "bg-green-300",
      text: "text-green-600",
    },
  },
  french: {
    color: {
      background: "bg-blue-300",
      text: "text-blue-600",
    },
  },
  "coffee break french": {
    color: {
      background: "bg-yellow-600",
      text: "text-yellow-900",
    },
  },
  verb: {
    color: {
      background: "bg-yellow-200",
      text: "text-yellow-500",
    },
  },
};

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      tagStyles: [],
    };
    this.data = {
      titleFront: props.title_front,
      textFront: props.text_front,
      titleBack: props.title_back,
      textBack: props.text_back,
      cardTags: props.tags,
      languageFront: props.language_front,
      languageBack: props.language_back,
    };
  }

  handleFlip = () => {
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  handleShow = () => {};

  render() {
    const { isFlipped } = this.state;

    return (
      <>
        <div className="flex-initial w-full md:w-1/3 lg:w-[24%] min-h-[225px] rounded overflow-hidden shadow-lg m-1 hover:cursor-pointer relative">
          <div className="px-6 py-4">
            { isFlipped ? (
              <>
              <div className="font-bold text-xl mb-2">{this.data.titleFront}</div>
              <p className="text-gray-700 text-base">{this.data.textFront}</p>
              </>
            ) : (
              <>
              <div className="font-bold text-xl mb-2">{this.data.titleBack}</div>
              <p className="text-gray-700 text-base">{this.data.textBack}</p>
              </>
            )}
          </div>
          <div className="pb-10 pl-4">
            {this.data.cardTags
              ? this.data.cardTags.map((tag, index) => {
                  let tagClass =
                    "inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 hover:cursor-pointer";
                  const tagBackground = tags[`${tag}`]
                    ? tags[`${tag}`].color.background
                    : "bg-gray-200";
                  const tagText = tags[`${tag}`]
                    ? tags[`${tag}`].color.text
                    : "text-gray-700";
                  tagClass += ` ${tagBackground} ${tagText}`;
                  return index < MAX_TAGS_TO_DISPLAY ? (
                    <span className={tagClass} key={index}>
                      #{tag}
                    </span>
                  ) : null;
                })
              : null}
            {this.data.cardTags > MAX_TAGS_TO_DISPLAY ? (
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold mr-2 hover:cursor-pointer bg-gray-200">
                ...
              </span>
            ) : null}
          </div>
          {/* <button className="flip-button px-2 ml-4 mb-2 block text-sm bg-gray-200 text-gray-500 font-semibold rounded border border-gray-200 hover:bg-gray-100 hover:border-transparent focus:outline-none focus:ring-1" onClick={this.handleFlip}>Flip</button> */}
          <div style={{ position: "absolute", bottom: 0 }}>
            <EditCard card={this.props} />
          </div>
        </div>
      </>
    );
  }
}

export default Card;
