import { Slider } from 'rsuite';

const MySlider = ({ min, max, value, onChange }) => {
    const scaleValues = [min, ...Array.from({ length: max - min }, (_, i) => min + i), max];

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {scaleValues.map((val, index) => (
                    <div key={index}>{val}</div>
                ))}
            </div>
            <Slider min={min} max={max} value={value} onChange={onChange} />
        </div>
    );
};

export default MySlider;