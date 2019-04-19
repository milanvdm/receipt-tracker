import { List } from 'immutable';

type Category = string

const categories: List<Category> = List([
    "Entertainment",
    "Food",
    "Houseware"
]);

export {
    categories,
    Category
}
