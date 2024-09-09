interface FilterOption {
    label: string;
    options: string[]
}

interface CategoryFilter {
    [key: string]: FilterOption[];
}

const filterCategory: CategoryFilter = {
    books: [
      { label: 'Genre', options: ['Poem','Spritual','Fiction', 'Non-Fiction', 'Sci-Fi'] },
      { label: 'Author', options: ['Dhumil','Acharya Prashant','J.K. Rowling', 'George R.R. Martin'] },
    ],
    laptops: [
        { label: 'Brand', options: ['Lenovo', 'HP', 'Dell'] },
        { label: 'RAM', options: ['8GB', '16GB', '32GB'] },
    ],    
    clothes: [
        { label: 'Brand', options: ['Zara', 'Kelvin', 'GoFashion'] },
    ],
    homeappliences: [
        {label: 'Home', options: ['Bedsheet', 'Table', 'Chair', 'Fan']}
    ],
    bikes: [
        {label: 'Brand', options: ['Hero', 'Honda', 'Royal Enfield', 'Vikranta']}
    ],
    shoes: [
        {label: 'Brand', options: ['Gold Star', 'Campus' ,'Nike', 'addidas']}
    ]
}

export {filterCategory}