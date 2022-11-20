import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebLayout from "./web_layout/WebLayout";
import Home from "./web_layout/Home";
import AllAutors from "./web_layout/AllAuthors";
import AllBooks from "./web_layout/AllBooks";
import Author from "./web_layout/Author";
import Book from "./web_layout/Book";
import CreateAuthor from "./web_layout/CreateAuthor";
import EditAuthor from "./web_layout/EditAuthor";
import CreateBook from "./web_layout/CreateBook";
import EditBook from "./web_layout/EditBook";
import NotFound from "./Not_found/NotFound";


const App = () => {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<WebLayout />}>
              <Route path="" element={<Home />} />
              <Route path="authors" element={<AllAutors />} />
              <Route path="books" element={<AllBooks />} />
              <Route path="author/:id" element={<Author />} />
              <Route path="book/:id" element={<Book />} />
              {/* ************************************************* */}
              <Route path="author/create" element={<CreateAuthor />} />
              <Route path="author/edit/:id" element={<EditAuthor />} />
              <Route path="book/create" element={<CreateBook />} />
              <Route path="book/edit/:id" element={<EditBook />} />
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
