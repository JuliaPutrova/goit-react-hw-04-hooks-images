import { useState, useEffect } from "react";

import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import LoaderIcon from "./components/Loader";

import api from "./services/pixabay-api";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");

  // метод для сохранения поиска
  const handleSearchBarSubmit = (query) => {
    setQuery(query);
    setPages(1);
    setImages([]);
  };

  // //метод запроса на сервер
  useEffect(() => {
    if (query === "") {
      return;
    }

    getPictures();
  }, [query]);

  // проверка для плавного скролла
  useEffect(() => {
    if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  const getPictures = () => {
    setIsLoading(true);

    api
      .getPictures(query, page)
      .then((response) => {
        setImages([...images, ...response]);
        setPages(page + 1);
      })
      .catch(() => alert("Please, try again..."))
      .finally(() => setIsLoading(false));
  };

  const reset = () => {
    setImages([]);
    setPages(1);
  };

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const onOpenModal = (e) => {
    setLargeImage(e.target.dataset.img);
    toggleShowModal();
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchBarSubmit} reset={reset} />
      {isLoading && <LoaderIcon />}
      <ImageGallery images={images} onOpenModal={onOpenModal} />
      {images.length > 0 && <Button onClick={getPictures} />}

      {showModal && (
        <Modal onClick={toggleShowModal}>
          <img src={largeImage} alt="" />
        </Modal>
      )}
    </div>
  );
}

export default App;

// //////////////////классовый Компонент
// import React, { Component } from "react";
// //импортируем библиотеку
// import Loader from "react-loader-spinner";

// import ImageGallery from "./components/ImageGallery";
// import Modal from "./components/Modal";
// import Searchbar from "./components/Searchbar";
// import Button from "./components/Button";
// import LoaderIcon from "./components/Loader";

// import api from "./services/pixabay-api";

// class App extends Component {
//   state = {
//     query: "",
//     images: [],
//     page: 1,
//     error: null,
//     isLoading: false,
//     showModal: false,
//     largeImage: "",
//   };

//   // метод для сохранения поиска
//   handleSearchBarSubmit = (query) => {
//     this.setState({
//       query: query,
//       // page: 1,
//       // images: [],
//     });
//   };

//   // //метод запроса на сервер
//   componentDidUpdate(prevProps, prevState) {
//     const prevSearch = prevState.query;
//     const nextSearch = this.state.query;
//     if (prevSearch !== nextSearch) {
//       this.getPictures();
//     }
//     // проверка для плавного скролла
//     if (prevState.page !== this.state.page) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }

//   getPictures = () => {
//     const { query, page } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     api
//       .getPictures(query, page)
//       .then((response) =>
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...response],
//           page: prevState.page + 1,
//         }))
//       )
//       .catch((error) => this.setState({ error }))
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   reset = () => {
//     this.setState({
//       images: [],
//       page: 1,
//     });
//   };

//   toggleShowModal = () => {
//     this.setState((prevState) => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   onOpenModal = (e) => {
//     this.setState({
//       largeImage: e.target.dataset.img,
//     });
//     this.toggleShowModal();
//   };

//   render() {
//     const { images, largeImage, isLoading, showModal } = this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.handleSearchBarSubmit} reset={this.reset} />
//         {isLoading && <LoaderIcon />}
//         <ImageGallery images={images} onOpenModal={this.onOpenModal} />
//         {images.length > 0 && <Button onClick={this.getPictures} />}

//         {showModal && (
//           <Modal onClick={this.toggleShowModal}>
//             <img src={largeImage} alt="" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }

// export default App;
