import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';

import Select from './'

var options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'tree', label: 'Tree' },
  { value: 'four', label: 'Four' },
  { value: 'five', label: 'Five' },
  { value: 'six', label: 'Six' },
  { value: 'seven', label: 'Seven' },
]

var getOptions = function(input, callback) {
  setTimeout(function() {
    callback(null, {
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ],
      // CAREFUL! Only set this to true when there are no more options,
      // or more specific queries will not be sent to the server.
      complete: true
    });
  }, 500);
};

const options1 = [
  {value: 1,  label: 'One'},
  {value: 2,  label: 'Two'},
];

const options2 = [
  {value: 3,  label: 'Three'},
  {value: 4,  label: 'Four'},
];

const SelectTest = class extends React.Component {
  state = {value: 0, clicked: false}

  handleChange = value => this.setState({value})

  handleClick = e => this.setState({clicked: !this.state.clicked})

  render() {
    const options = [{value: 0,  label: 'Select any option and click the button'}].concat(this.state.clicked ? options2 : options1);
    console.log('this.state.value:', this.state.value);
    return (
      <div>
        <Select value={this.state.value || "0"} options={options} onChange={this.handleChange}/>
        <button onClick={this.handleClick}>click me</button>
      </div>
    )
  }
}

storiesOf('Select', module)
  .add('default', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM
          name="form-field-name"
          options={options}
          onOpen={action('onOpen')}
          onChange={action('onChange')}
          onInputClear={action('onInputClear')}
          onValueClick={action('onValueClick')}
        />
      </div>
    </div>
  ))
  .add('no results', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM
          className="secondary"
          name="form-field-name"
          options={[]}
          onOpen={action('onOpen')}
          onChange={action('onChange')}
          onInputClear={action('onInputClear')}
          onValueClick={action('onValueClick')}
        />
      </div>
    </div>
  ))
  .add('valueRenderer', () => {
    const customValueRenderer = (option) => {
      return (
        <span>{option.value} - {option.label}</span>
      );
    }
    return (
      <div style={{display: 'flex', margin: '20px'}}>
        <div style={{width: '300px'}}>
          <Select.ShadowDOM
            className="secondary"
            name="form-field-name"
            options={options}
            valueRenderer={customValueRenderer}
          />
        </div>
      </div>
    )
  })
  .add('optionRenderer', () => {
    const customOptionRenderer = (option) => {
      return (
        <li onMouseDown={option.onMouseDown}
          style={{border: '1px solid red'}}>Custom Item: {option.label}</li>
      );
    }
    return (
      <div style={{display: 'flex', margin: '20px'}}>
        <div style={{width: '300px'}}>
          <Select.ShadowDOM
            options={options}
            optionRenderer={customOptionRenderer}
          />
        </div>
      </div>
    )
  })
  .add('No searchable', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select
          searchable={false}
          options={options}
        />
      </div>
    </div>
  ))
  .add('No searchable ShadowDOM', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM
          searchable={false}
          options={options}
        />
      </div>
    </div>
  ))
  .add('clearable=true', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM
          clearable
          options={options}
        />
      </div>
    </div>
  ))
  .add('multi=true', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM
          multi
          value={['one', 'four']}
          options={options}
          onChange={action('onChange')}
        />
      </div>
      <div className="secondary" style={{width: '300px'}}>
        <Select.ShadowDOM
          multi
          value={['one', 'four']}
          options={options}
          onChange={action('onChange')}
        />
      </div>
    </div>
  ))
  .add('async', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <Select.ShadowDOM.Async
          loadOptions={getOptions}
          onChange={action('onChange')}
        />
      </div>
    </div>
  ))
  .add('issues #24 reprodution', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <SelectTest />
      </div>
    </div>
  ))
  .add('required=true', () => (
    <div style={{display: 'flex', margin: '20px'}}>
      <div style={{width: '300px'}}>
        <form action="/some_end_point.php">
          <Select
            required={true}
            options={options}
          />
          <input type="submit" style={{background: "#ccc"}}/>
        </form>
      </div>
    </div>
  ))
