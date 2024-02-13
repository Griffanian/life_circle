import { useState, useEffect } from "react"

export default function RatingsFilter({ ratings, setFilteredRatings }) {

    const [after, setAfter] = useState(false)
    const [date, setDate] = useState(new Date())

    function filterRatings() {
        setFilteredRatings(ratings.filter(rating => {
            const ratingDate = new Date(rating.rating_date);
            if (after) {
                return ratingDate > date || ratingDate.getDate() === date.getDate();
            } else {
                return ratingDate < date || ratingDate.getDate() === date.getDate();
            }
        }))
    }
    function resetFilter() {
        setAfter(false)
        setDate(new Date())
    }

    useEffect(() => {
        filterRatings()
    }, [after, date])

    return (
        <div className="ratingsFilterContainer">
            <select name="filterType" value={after} onChange={() => setAfter(!after)}>
                <option value={false}>Before</option>
                <option value={true}>After</option>
            </select>
            <input value={date.toISOString().split('T')[0]} type='date' onChange={(e) => setDate(new Date(e.target.value))}></input>
            <button onClick={() => resetFilter()}>Reset</button>
        </div>
    )
}