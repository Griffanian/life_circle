import { getFormattedDate } from '../../frontEndFuncs/miscFuncs';
import { Link } from 'react-router-dom';
import globals from "../../globals";

export default function RatingTable({ ratings }) {
    const categories = globals.CATEGORIES;
    const prettyCategories = globals.PRETTY_CATEGORIES;
    return (
        <div className="ratingTable">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>

                        {
                            prettyCategories.map((category) => {
                                return (<th className="catData" key={category} >{category}</th>)
                            })
                        }
                        <th>Average</th>
                        <th className="actions"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ratings.map((rating) => {
                            return (
                                <tr key={rating.rating_id}>
                                    <td>{getFormattedDate(rating.rating_date)}</td>

                                    {
                                        categories.map((category) => {
                                            return (<td className="catData" key={categories.indexOf(category)}>{rating[category]}</td>)
                                        })
                                    }
                                    <td>{rating.average}</td>
                                    <td className="actions">
                                        <Link to={"/editRating/" + rating.rating_id}>
                                            <i className="fa-solid fa-pen"></i>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}