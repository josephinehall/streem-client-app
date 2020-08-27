import React, { Component } from 'react'

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    this.props.fetchData(formData);
  }

    var url = new URL(process.env.REACT_APP_API_URL)

    var params = {
      query: formData.get('query'),
      after:formData.get('after'),
      before: formData.get('before'),
      interval: formData.get('interval'),
    }

    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      headers: {
        'Authorization': 'Token ' + process.env.REACT_APP_API_TOKEN
      }
    }).then(response => response.json())
      .then(data => console.log(data));

  };
  return (
      <div>
        <label htmlFor="query">Query:</label>
        <input
          type="text"
          id="query"
          name="query"
          required
          placeholder="scott morrison"
        />
      </div>
      <div>
        <label htmlFor="after">Beginning at:</label>
        <input
          type="number"
          id="after"
          name="after"
          required
          placeholder="1554037199999"
        />
      </div>
      <div>
        <label htmlFor="before">Ending at:</label>
        <input
          type="number"
          id="before"
          name="before"
          required
          placeholder="1567209600000"
        />
      </div>
      <div>
        <label htmlFor="interval">Interval:</label>
        <input
          type="text"
          id="interval"
          name="interval"
          required
          placeholder="1d"
        />
      </div>
      <button>Search</button>
    </form>
  );
      <form onSubmit={this.handleSubmit}>
}

export default Form;
