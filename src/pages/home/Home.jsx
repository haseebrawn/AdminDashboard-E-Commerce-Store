import Navbar from '../../Components/navbar/Navbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import Widget from '../../Components/widget/Widget';
import Chart from '../../Components/chart/Chart';
import Featured from '../../Components/featured/Featured';
import  TableComponent  from '../../Components/table/TableComponent';
import  './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className="widgets">
        <Widget type="user"/>
        <Widget type="order"/>
        <Widget type="earning"/>
        <Widget type="balance"/>
      </div>
      <div className="charts">
        <Featured />
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1}/>
      </div>
      <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <TableComponent />
        </div>
    </div>
    </div>
  )
}

export default Home