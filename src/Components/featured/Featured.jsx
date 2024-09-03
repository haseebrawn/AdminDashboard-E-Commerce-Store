import './Featured.css';
import { MdMoreVert } from "react-icons/md";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const Featured = () => {
  return (
   <div className="featured">
    <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MdMoreVert fontSize="medium"/>
    </div>
    <div className="bottom">
        <div className="featuredChart">
            <CircularProgressbar value={70} text='70%' strokeWidth={4}/>
        </div>
        <p className="title-para">Total sales made today</p>
        <p className="amount">$430</p>
        <p className="desc">Previous transaction processing. Last payment may not be included</p>
        <div className="summary">
            <div className="item">
                <div className="itemTitle"> Target   </div>
                    <div className="itemResult negative"> 
                    <MdKeyboardArrowDown fontSize='medium'/>
                        <div className="resultAmount">$12.4k</div>
                </div>
            </div>
            <div className="item">
                <div className="itemTitle"> Last Week  </div>
                    <div className="itemResult positive"> 
                    <MdKeyboardArrowUp fontSize='medium'/>
                        <div className="resultAmount">$12.4k</div>
                </div>
            </div>
            <div className="item">
                <div className="itemTitle"> Last Month </div>
                    <div className="itemResult positive"> 
                    <MdKeyboardArrowUp fontSize='medium'/>
                        <div className="resultAmount">$12.4k</div>
                </div>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Featured
