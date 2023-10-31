import React, { useState } from 'react';
import Status from '../Status'; // Import your Status component
import Priority from '../Priority'; // Import your Priority component
import User from '../User';

const DropdownComponent = () => {
  const [selectedOption, setSelectedOption] = useState("status");
 
  const [sortingCriteria, setSortingCriteria] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSortingChange = (event) => {
	setSortingCriteria(event.target.value)
  }

  return (
    <div>
      
    
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="status">By Status</option>
        <option value="priority">By Priority</option>
		<option value = "user">By User</option>
      </select>
	  <select value = {sortingCriteria} onChange={handleSortingChange}>
		<option value='priority'>Priority</option>
		<option value='Title'>Title</option>

	  </select>
	  


      {selectedOption === 'status' && <Status sorting = {sortingCriteria}/>}
      {selectedOption === 'priority' && <Priority sorting = {sortingCriteria}/>}
	  {selectedOption === 'user' && <User sorting = {sortingCriteria}/>}
    </div>
  );
};

export default DropdownComponent;
