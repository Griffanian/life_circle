import { useState, useEffect } from "react"

export default function RatingsFilter({ ratings, setFilteredRatings }) {

    const [after, setAfter] = useState(false)
    const [date, setDate] = useState(new Date())

    function filterRatings() {
        if (after) {
            setFilteredRatings(ratings.filter((rating) => new Date(rating.rating_date) > date))
        } else {
            setFilteredRatings(ratings.filter((rating) => new Date(rating.rating_date) < date))
        }
    }
    function resetFilter() {
        setAfter(false)
        setDate(new Date())
    }

    useEffect(() => {
        filterRatings()
    }, [after, date])

    return (
        <div onChange={() => filterRatings()}>
            <select name="filterType" value={after} onChange={(e) => { setAfter(e.target.value) }}>
                <option value={false} >Before</option>
                <option value={true}>After</option>
            </select>
            <input value={date.toISOString().split('T')[0]} type='date' onChange={(e) => setDate(new Date(e.target.value))}></input>
            <button onClick={() => resetFilter()}>reset</button>
        </div >
    )
}