import { useState } from "react";
import PropTypes from "prop-types";

function Searchbar({ onSubmit, reset }) {
  const [query, setQuery] = useState("");

  //метод, который будет обновлять состояние input
  const handleChangeQuery = (e) => {
    setQuery(e.currentTarget.value);
  };

  //метод для отправки form
  const handleSubmit = (e) => {
    //функция, чтобы старница не перезагружалась при submit
    e.preventDefault();
    //передаем props Компонента SearchBar (ребенка) в Компонент App (родитель)
    onSubmit(query);
    setQuery("");

    //очищаем поле поиса
    reset();
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={handleChangeQuery}
          className="SearchForm-input"
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Searchbar;

// ////////////
// import React, { Component } from "react";

// class Searchbar extends Component {
//   state = {
//     query: "",
//   };

//   //метод, который будет обновлять состояние input
//   handleChangeQuery = (e) => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   //метод для отправки form
//   handleSubmit = (e) => {
//     //функция, чтобы старница не перезагружалась при submit
//     e.preventDefault();
//     //передаем props Компонента SearchBar (ребенка) в Компонент App (родитель)
//     this.props.onSubmit(this.state.query);
//     this.setState({
//       query: "",
//     });
//     //очищаем поле поиса
//     this.props.reset();
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             onChange={this.handleChangeQuery}
//             className="SearchForm-input"
//             type="text"
//             name="query"
//             value={this.state.query}
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Searchbar;
