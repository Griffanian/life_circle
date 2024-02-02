import { capitalize } from 'lodash';
import { getFormattedDate } from '../frontEndFuncs/miscFuncs';
import { Link } from 'react-router-dom';

export default function RatingTable({ categories, ratings }) {
    return (
        <div className="ratingTable">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Average</th>
                        {
                            categories.map((category) => {
                                return (<th className="catData" key={category} >{capitalize(category)}</th>)
                            })
                        }
                        <th className="actions"> </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ratings.map((rating) => {
                            return (
                                <tr key={rating.rating_id}>
                                    <td>{getFormattedDate(rating.rating_date)}</td>
                                    <td>{rating.average}</td>
                                    {
                                        categories.map((category) => {
                                            return (<td className="catData" key={categories.indexOf(category)}>{rating[category]}</td>)
                                        })
                                    }
                                    <td className="actions">
                                        <Link to={"/editRating/" + rating.rating_id}>
                                            <i className="fa-solid fa-pen"></i>
                                        </Link>
                                        <a onClick={(e) => handleDelete(e)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </a>
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