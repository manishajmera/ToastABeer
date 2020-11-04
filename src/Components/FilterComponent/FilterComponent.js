import React from 'react';
import "./FilterComponent.css";

export default function FilterComponent({filterList,setFilterList}) {
      // const [userFilter, setUserFilter] = useState("");
    // const handleRemoveFilter = (e, userFilter) => {
    //     let userFilters= filterList;
    //     const index = userFilters.indexOf(userFilter);
    //     if (index > -1) {
    //         userFilters.splice(index, 1);
    //     }
    //     setFilterList([...userFilters]);
    // };
    // const handleKeyDown = (e) => {
    //     if (e.which === 13) {
    //       let userFilters = filterList;
    //       userFilters.push(userFilter);
    //       setUserFilter("");
    //       setFilterList([...userFilters]);
    //     }
    //   };
    return (
       <div className="row filter">
            <div className="col col-sm-7 filter-by-ingredient">
                Filter By Ingredients:
                <input type="text" className="form-control" placeholder="Enter ingrident name"/>
                <input type="number" className="form-control" min="0" max="50" step="0.1" value="0"/>
            </div>
            <div className="col col-sm-5">
                Filter By Foods:
                <input type="text" className="form-control" placeholder="Enter Food Names" />
            </div>
       </div>
    )
}
