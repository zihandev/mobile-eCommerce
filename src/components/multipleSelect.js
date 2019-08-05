import React from 'react';
import Select from 'react-select';
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
 
export default class App extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
   
  };
  render() {
    const { selectedOption } = this.state;
  console.log(this.state)
    return (
      <Select isMulti={true} isSearchable={false}
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}