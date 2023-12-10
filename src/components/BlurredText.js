import { useState } from "react"

export default function BlurredText(props) {
    const [blurred, setBlurred] = useState(false)

    const handleClick = () => {
        console.log(blurred)
        setBlurred((prev) => !prev)
    }
    return (
        <p>Client Name:
            <span className={blurred ? null : "blurredText"} onClick={(e) => handleClick(e)}>
                {" " + props.children}
            </span>
        </p>

    )
}