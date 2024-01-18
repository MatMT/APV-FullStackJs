
function TitleMain({ text, span = "Pacientes", color }) {
    return (
        <div>
            <h1 className={`text-${color}-600 font-black text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-0`}>{text} <span className="text-gray-700">{span}</span></h1>
        </div>
    )
}

export default TitleMain