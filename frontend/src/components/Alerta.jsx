
function Alerta({ alerta }) {
    return (
        <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-lime-500 to-lime-600'} bg-gradient-to-r p-3 text-white font-bold text-center rounded-xl text-sm uppercase mb-5`}>
            {alerta.msg}
        </div>
    )
}

export default Alerta