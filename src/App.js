import React, { Component } from 'react'
import './App.css';
import Form from './Form';
import Graph from './Graph';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  fetchData(formData) {
    this.setState({ error: false });
    var url = new URL(process.env.REACT_APP_API_URL);

    var params = {
      query: formData.get('query'),
      after: formData.get('after'),
      before: formData.get('before'),
      interval: formData.get('interval'),
    };

    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      headers: {
        'Authorization': 'Token ' + process.env.REACT_APP_API_TOKEN
      }
    }).then(response => {
      if (!response.ok) {
        this.setState({ error: true });
        throw response;
      }
      return response.json();
    }).then(data => this.setState({ data }));
  }

  formatData(data) {
    let mediaTypes = [];

    let results = data.map((dateBucket) => {
      const result = {
        timestamp: dateBucket.key_as_string
      };
      dateBucket.term_agg.buckets.forEach((media) => {
        result[media.key.toLowerCase()] = media.doc_count;
        mediaTypes.push(media.key);
      });
      return result;
    });

    let uniqueMediaTypes = [...new Set(mediaTypes)];

    return {
      results: results,
      media: uniqueMediaTypes.map((type) => {
        return {
          name: type,
          id: type.toLowerCase()
        };
      })
    };
  }

  render() {
    let data = this.state.data && this.state.data.aggregations.date_agg.buckets;

    return (
      <div className="App">
        <Form fetchData={this.fetchData} />
        { (data != null && !this.state.error) && <Graph data={this.formatData(data)} /> }
        { (this.state.error) && <div>Sorry, we couldn’t find any results.</div>}
      </div>
    )
  }
}

export default App;
