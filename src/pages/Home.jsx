import React, { useState, useEffect, useContext, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { sortValue } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const fetchPizzas = () => {
    setIsLoading(true);
    axios
      .get(
        `https://698449b9885008c00db098f0.mockapi.io/pizza?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ``}&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}&${searchValue ? `search=${searchValue}` : ''}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  };

  const { searchValue, setSearchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortValue.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, searchValue, sortType, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const querySrting = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${querySrting}`);
    }

    isMounted.current = true;
  }, [categoryId, searchValue, sortType, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, id) => <PizzaSkeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
