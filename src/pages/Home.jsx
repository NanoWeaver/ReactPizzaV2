import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();
  const categoryID = ''; // заглушка
  console.log('ID что уже хранится в Redux ' + categoryId);

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [categoryID, setCategoryID] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: 'популярности DESC', sortProperty: 'rating' });
  const onChangeCategory = (id) => {
    console.log('Наш id при клике ' + id);
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://698449b9885008c00db098f0.mockapi.io/pizza?page=${currentPage}&limit=4&${categoryID > 0 ? `category=${categoryID}` : ``}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}&${searchValue ? `search=${searchValue}` : ''}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        const itemsData = Array.isArray(arr) ? arr : [];
        setItems(itemsData);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryID, searchValue, sortType, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, id) => <PizzaSkeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryID} onChangeCategory={onChangeCategory} />
        <Sort type={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
