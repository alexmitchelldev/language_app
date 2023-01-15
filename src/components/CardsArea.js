import Cards from "../pages/Cards";
import AddCard from "./AddCard";
import FlashcardModal from "./NewAddCard";

const CardsArea = () => {
  return (
    <>
      <div className="mx-auto md:mt-2 mt-1 md:w-4/5 w-[98%] rounded border border-slate-200 min-h-[80vh]">
        <nav className="bg-gray-200 p-2 flex md:flex-row flex-col justify-center items-center mb-2">
            <div className="w-full md:w-auto mb-1">
              <div className="relative rounded-md shadow-sm md:mr-2">
                <input
                  type="search"
                  className="form-input py-2 pl-9 pr-40 block w-full leading-5 rounded-md transition duration-150 ease-in-out bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-gray-50"
                  placeholder="Search cards...."
                  aria-label="Search cards"
                ></input>
                <div className="absolute inset-y-0 left-0 pl-3">
                  <svg
                    className="h-10 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto md:mr-2 mb-1">
              <select
                className="block form-select py-2 px-4 pr-8 rounded-md bg-white border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-green-300 focus:shadow-outline-green"
                aria-label="Filter by deck"
              >
                <option>All decks</option>
                <option>Deck 1</option>
                <option>Deck 2</option>
                <option>Deck 3</option>
              </select>
            </div>
          <div className="mb-1 w-full md:w-auto">
            <FlashcardModal />
            {/* <AddCard /> */}
          </div>
          <div className="mb-1 w-full md:w-auto">
            <button className="bg-gray-600 hover:bg-gray-800 text-white py-1 px-6 rounded-md w-full md:w-auto">
              <span className="text-lg font-medium">Create Deck</span>
              <svg
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </nav>
        <Cards />
      </div>
    </>
  );
};

export default CardsArea;
