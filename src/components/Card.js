import { useState, useEffect } from "react";

const Card = (props) => {
  const [tagsStyles, setTagsStyles] = useState([]);
  let tagsArray = null;

  useEffect(() => {
    fetch("http://localhost:8002/api/tags")
      .then((response) => response.json())
      .then((data) => setTagsStyles(data));
  });

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
        text: "text-yellow-900"
      }
    },
    verb: {
      color: {
        background: "bg-yellow-200",
        text: "text-yellow-500"
      }
    }
  };

  if (props.tags) {
    tagsArray = JSON.parse(props.tags);
  }

  return (
    <>
      <div className="w-full md:w-1/3 lg:w-1/5 rounded overflow-hidden shadow-lg">
        {props.img ? (
          <img
            className="w-full"
            src={props.img ? props.img : null}
            alt="Sunset in the mountains"
          ></img>
        ) : null}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title_front}</div>
          <p className="text-gray-700 text-base">{props.text_front}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {props.tags
            ? tagsArray.map((tag) => {
                let tagClass =
                  "inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2";
                const tagBackground = tags[`${tag}`]
                  ? tags[`${tag}`].color.background
                  : "bg-gray-200";
                const tagText = tags[`${tag}`]
                  ? tags[`${tag}`].color.text
                  : "text-gray-700";
                tagClass += ` ${tagBackground} ${tagText}`;
                return <span className={tagClass}>#{tag}</span>;
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default Card;
