import React,{useState} from 'react'

export default function FilterComponent() {
    const [filterList, setFilterList] = useState([]);
      const [userFilter, setUserFilter] = useState("");
    const handleRemoveFilter = (e, userFilter) => {
        let userFilters= filterList;
        const index = userFilters.indexOf(userFilter);
        if (index > -1) {
            userFilters.splice(index, 1);
        }
        setFilterList([...userFilters]);
    };
    const handleKeyDown = (e) => {
        if (e.which === 13) {
          let userFilters = filterList;
          userFilters.push(userFilter);
          setUserFilter("");
          setFilterList([...userFilters]);
        }
      };
    return (
        <div>
        <span>Filters:</span>
        <div className="borderClass">
        {filterList.map((item, index) => (
            <span
            key={index}
            style={{ marginRight: "20px", fontSize: "16px" }}
            >
            {item}
            <span
                className="close"
                onClick={(e) => handleRemoveFilter(e, item)}
            >
                x
            </span>
            </span>
        ))}
        <input
            type="text"
            onChange={(e)=>{setUserFilter(e.target.value)}}
            value={userFilter}
            onKeyDown={handleKeyDown}
        />
        </div>
        </div>
    )
}
