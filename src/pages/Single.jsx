import Sidebar from "../Sidebar/Sidebar";
import Singlepost from "../single-post/Singlepost";
import "./Single.css";

const Single = () => {
  return (
    <div className="single">
        <Singlepost/>
        <Sidebar/>
    </div>
  )
}

export default Single