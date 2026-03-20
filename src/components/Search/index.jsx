import React, { useState, useRef, useContext, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

function Search() {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const onClickClear = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="512"
        height="512">
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 511.991 511.991"
          width="512"
          height="512">
          <g>
            <path d="M286.161,255.867L505.745,36.283c8.185-8.474,7.951-21.98-0.523-30.165c-8.267-7.985-21.375-7.985-29.642,0   L255.995,225.702L36.411,6.118c-8.475-8.185-21.98-7.95-30.165,0.524c-7.985,8.267-7.985,21.374,0,29.641L225.83,255.867   L6.246,475.451c-8.328,8.331-8.328,21.835,0,30.165l0,0c8.331,8.328,21.835,8.328,30.165,0l219.584-219.584l219.584,219.584   c8.331,8.328,21.835,8.328,30.165,0l0,0c8.328-8.331,8.328-21.835,0-30.165L286.161,255.867z" />
          </g>
        </svg>
      )}
    </div>
  );
}
export default Search;
