import React, { useState, useEffect, useMemo } from "react";
import {
BrandsService,
CategoriesService,
SortService,
PagingService,
} from "./Service";

function ProductsList() {
//state
let [products, setProducts] = useState([]); //represents the array of products to show in the grid
let [originalProducts, setOriginalProducts] = useState([]); //stores the actual array of products loaded from server
let [search, setSearch] = useState(""); //represents the value of search textbox
let [sortBy, setSortBy] = useState("productName"); //Represents name of the sort column selected by the user
let [sortOrder, setSortOrder] = useState("ASC"); //ASC or DESC: represents order of sorting either ascending or descending
let [brands, setBrands] = useState([]); //stores all brands from server
let [selectedBrand, setSelectedBrand] = useState(""); //represents name of the brand selected by the user
let [pages, setPages] = useState([]);
let [pageSize] = useState(5);
let [currentPageIndex, setCurrentPageIndex] = useState(0);

//useEffect: Executes on first render only
useEffect(() => {
    (async () => {
    //get data from brands database
    let brandsResponse = await BrandsService.fetchBrands();
    let brandsResponseBody = await brandsResponse.json();
    setBrands(brandsResponseBody);

    //get data from categories database
    let categoriesResponse = await CategoriesService.fetchCategories();
    let categoriesResponseBody = await categoriesResponse.json();

    //get data from products database
    let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,
        { method: "GET" }
    );
    let productsResponseBody = await productsResponse.json();

    //set "brand" and "category" property for each product
    productsResponseBody.forEach((product) => {
        product.brand = BrandsService.getBrandByBrandId(
        brandsResponseBody,
        product.brandId
        );

        product.category = CategoriesService.getCategoryByCategoryId(
        categoriesResponseBody,
        product.categoryId
        );
    });

    setProducts(productsResponseBody);
    setOriginalProducts(productsResponseBody);
    setCurrentPageIndex(0);
    })();
}, [search]);

//filter products based on selected brand name in the dropdownlist
let filteredProducts = useMemo(() => {
    //console.log("filteredProducts", originalProducts, selectedBrand);
    return originalProducts.filter(
    (prod) => prod.brand.brandName.indexOf(selectedBrand) >= 0
    );
}, [originalProducts, selectedBrand]);

//When the selectedBrand changes
useEffect(() => {
    setCurrentPageIndex(0);
}, [selectedBrand]);

//when the user clicks on a column name to sort
let onSortColumnNameClick = (event, columnName) => {
    event.preventDefault(); //avoid refresh
    setSortBy(columnName);
    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
};

//useEffect: Executes on each change of filteredBrands, sortBy or sortOrder
useEffect(() => {
    //calculate no. of pages & create page objects
    setPages(PagingService.getPagesArray(filteredProducts, pageSize));

    //sort
    let sortedArray = SortService.getSortedArray(
    filteredProducts,
    sortBy,
    sortOrder
    );

    //paging
    let pagedArray = PagingService.getRowsByPageIndex(
    sortedArray,
    currentPageIndex,
    pageSize
    );
    //get sorted products
    setProducts(pagedArray);
}, [filteredProducts, sortBy, sortOrder, pageSize, currentPageIndex]);

//When the user clicks on page number
let onPageIndexClicked = (clickedPageIndex) => {
    if (clickedPageIndex >= 0 && clickedPageIndex < pages.length)
    setCurrentPageIndex(clickedPageIndex);
};

//render column name
let getColumnHeader = (columnName, displayName) => {
    return (
    <React.Fragment>
        <a
        href="/#"
        onClick={(event) => {
            onSortColumnNameClick(event, columnName);
        }}
        >
        {displayName}
        </a>{" "}
        {sortBy === columnName && sortOrder === "ASC" ? (
        <i className="fa fa-sort-up"></i>
        ) : (
        ""
        )}
        {sortBy === columnName && sortOrder === "DESC" ? (
        <i className="fa fa-sort-down"></i>
        ) : (
        ""
        )}
    </React.Fragment>
    );
};

return (
    <div className="row">
    <div className="col-12">
        <div className="row p-3 header">
        <div className="col-lg-3">
            <h4>
            <i className="fa fa-suitcase"></i> Products{" "}
            <span className="badge badge-secondary">
                {filteredProducts.length}
            </span>
            </h4>
        </div>

        <div className="col-lg-6">
            <input
            type="search"
            value={search}
            placeholder="Search"
            className="form-control"
            autoFocus="autofocus"
            onChange={(event) => {
                setSearch(event.target.value);
            }}
            />
        </div>

        <div className="col-lg-3">
            <select
            className="form-control"
            value={selectedBrand}
            onChange={(event) => {
                setSelectedBrand(event.target.value);
            }}
            >
            <option value="">All Brands</option>
            {brands.map((brand) => (
                <option value={brand.brandName} key={brand.id}>
                {brand.brandName}
                </option>
            ))}
            </select>
        </div>
        </div>
    </div>

    <div className="col-lg-10 mx-auto mb-2" style={{ height: "380px" }}>
        <div className="card my-2 shadow">
        <div className="card-body">
            <table className="table">
            <thead>
                <tr>
                <th>{getColumnHeader("productName", "Product Name")}</th>
                <th>{getColumnHeader("price", "Price")}</th>
                <th>{getColumnHeader("brand", "Brand")}</th>
                <th>{getColumnHeader("category", "Category")}</th>
                <th>{getColumnHeader("rating", "Rating")}</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>{product.price}</td>
                    <td>{product.brand.brandName}</td>
                    <td>{product.category.categoryName}</td>
                    <td>
                    {[...Array(product.rating).keys()].map((n) => {
                        return (
                        <i className="fa fa-star text-warning" key={n}></i>
                        );
                    })}
                    {[...Array(5 - product.rating).keys()].map((n) => {
                        return (
                        <i className="fa fa-star-o text-warning" key={n}></i>
                        );
                    })}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>

    <div className="col-12">
        <ul className="pagination justify-content-center mt-1">
        <li
            className="page-item"
            onClick={() => {
            onPageIndexClicked(currentPageIndex - 1);
            }}
        >
            <a
            className="page-link bg-secondary text-white"
            href="/#"
            onClick={(event) => {
                event.preventDefault();
            }}
            >
            Prev
            </a>
        </li>
        {pages.map((page) => (
            <li
            key={page.pageIndex}
            className={
                currentPageIndex === page.pageIndex
                ? "page-item active"
                : "page-item"
            }
            onClick={() => {
                onPageIndexClicked(page.pageIndex);
            }}
            >
            <a
                className="page-link"
                href="/#"
                onClick={(event) => {
                event.preventDefault();
                }}
            >
                {page.pageIndex + 1}
            </a>
            </li>
        ))}

        <li
            className="page-item"
            onClick={() => {
            onPageIndexClicked(currentPageIndex + 1);
            }}
        >
            <a
            className="page-link bg-secondary text-white"
            href="/#"
            onClick={(event) => {
                event.preventDefault();
            }}
            >
            Next
            </a>
        </li>
        </ul>
    </div>
    </div>
);
}

export default ProductsList;
