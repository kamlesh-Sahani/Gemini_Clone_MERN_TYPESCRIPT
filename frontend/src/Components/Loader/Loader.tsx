import './loader.scss';

const Loader = () => {
    const arr = new Array(6).fill(1);

  return (
    <div className="loader">
        {
            arr.map((v,i)=>(
                <div className="loader_div" key={i+v}></div>
            ))
        }
    
    </div>
  )
}

export default Loader