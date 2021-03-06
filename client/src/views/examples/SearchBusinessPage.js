import React from "react";
import { MDBDataTable } from 'mdbreact';
// reactstrap components


import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import {FormControl} from "react-bootstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

  export default class SearchBusinessPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      itineraryOptions: [],
      itinValue: '',
      categoryValue: '',
      rows: [],
      
      columns: [
        {
        'label': 'Check',
        'field': 'check'
        },
        {
        label: 'Business Name',
        field: 'name',
        sort: 'asc'
      },
      {
        label: 'Address',
        field: 'address',
        sort: 'asc'
      },
      {
        label: 'Stars',
        field: 'stars',
        sort: 'asc'
      }],
      data: []
    }
    this.submitSearch = this.submitSearch.bind(this);
    this.getItineraries = this.getItineraries.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);

  }

  //searches business destination based on provided input from user
  submitSearch(e) {
    e.preventDefault();
    let city = e.target.city.value;
    let state = e.target.state.value;
    let stars = e.target.stars.value;
    let category = this.state.categoryValue;

    if (stars === undefined) {
      stars = 0;
    }
    
    if (category !== '' && category != 'All') {
      fetch("http://localhost:8082/searchCityBusinessCat/" + city + "/" + state + "/" + stars + "/" + category,
    {
      method: "GET",
    }).then(res => {
      return res.json();
    }, err => {
      console.log("Error: " + err);
    }).then(result => {

      var resultTable = []
      for (let ind in result) {
        var elt = result[ind]
        var biz_id = elt.BUSINESS_ID
        resultTable.push({check: <Input type="checkbox" name={biz_id} value={elt.NAME}/>, name: elt.NAME, address: elt.ADDRESS, stars: elt.STARS})
      }

      this.setState({
				searchResults: resultTable
      });
      this.setState({
        data: {columns: this.state.columns, rows: resultTable}
      }) 
    });
    } else {
      fetch("http://localhost:8082/search/" + city + "/" + state + "/" + stars,
      {
        method: "GET",
      }).then(res => {
        return res.json();
      }, err => {
        console.log("Error: " + err);
      }).then(result => {

        var resultTable = []
        for (let ind in result) {
          var elt = result[ind]
          var biz_id = elt.BUSINESS_ID
          resultTable.push({check: <Input type="checkbox" name={biz_id} value={elt.NAME}/>, name: elt.NAME, address: elt.ADDRESS, stars: elt.STARS})
        }

        this.setState({
          searchResults: resultTable
        });
        this.setState({
          data: {columns: this.state.columns, rows: resultTable}
        }) 
      });
    }

  }

  //adds checked businesses to itinerary based on provided input from user
  addToItinerary(e) {
    let itinName = e.target[0].value
    let toAddList = []
    const formData = new FormData(e.target);
    e.preventDefault();
    for (var [key, value] of formData.entries()) {
      toAddList.push(key)
    }

    fetch("http://localhost:8082/addBusToItin",
    {
      method: "POST",
      body: JSON.stringify({itin_id: itinName, list: toAddList}),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }, err => {
      console.log("Error: " + err);
    }).then(result => {
      console.log(result)
      alert("Successfully added!")
    });
    
  }

  //gets all itineraries of particular users
  getItineraries(email) {
    fetch("http://localhost:8082/getCustItineraryNames/" + email,
    {
      method: "GET",
    }).then(res => {
      return res.json();
    }, err => {
      console.log("Error: " + err);
    }).then(result => {
      let resOptions = result.map((elt, i) => 
        <option value={elt.ITINERARY_ID} name={elt.ITINERARY_ID}>{elt.NAME}</option>
      );
      this.setState({
        itineraryOptions: resOptions
      }) 
    });
  }

  handleChange(event) {
    this.setState({itinValue: event.target.value});
  }

  handleCatChange(event) {
    this.setState({categoryValue: event.target.value});
  }

  componentWillMount(){
    let email = '';
    console.log(localStorage.getItem('email'))
    if (localStorage && localStorage.getItem('email')) {
      email = JSON.parse(localStorage.getItem('email'));
    }
    this.setState({email: email})
    this.getItineraries(email)
  }

  render() {    
    return (
      <>
      <IndexNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/bg-search.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
          <Form className="form" onSubmit={this.submitSearch}> 
            <Row>
              <Col>
                <InputGroup className={"no-border input-lg" } >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="city"
                  placeholder="City"
                  type="text"
                  required
                ></Input>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup className={"no-border input-lg" } >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons location_world"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="state"
                    placeholder="State"
                    type="text"
                    required
                  ></Input>
                </InputGroup>
              </Col>   
              
              <Col sm="2">
                <InputGroup className={"no-border input-lg" } >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-2_favourite-28"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="stars"
                    placeholder="Min Stars"
                    type="number"
                    min={0} max={5}
                  ></Input>
                </InputGroup>
              </Col>
              <Col sm="2">
                <FormControl as="select" value={this.state.value} onChange={this.handleCatChange} style={{margin: "12px"}}>
                  <option value="All" name="rest">All</option>
                  <option value="Restaurants" name="rest">Restaurants</option>
                  <option value="Shopping" name="shopping">Shopping</option>
                  <option value="Nightlife" name="nightlife">Nightlife</option>
                  <option value="Arts and Entertainment" name="art">Active Life</option>
                  <option value="Breweries" name="art">Breweries</option>
                </FormControl>
              </Col>
              <Col sm="1.5">
               <Button
                block
                className="btn-round"
                color="info"
                size="sm"
                type="submit"
              >
                Search
              </Button>
              </Col>       
            </Row>
            </Form>
          </Container>
          <Container>
          <Form className="form" onSubmit={this.addToItinerary}> 
            <Row>
              <Col sm="2" >
              <FormControl as="select" value={this.state.value} onChange={this.handleChange} style={{margin: "12px"}}>
                {this.state.itineraryOptions}
              </FormControl>
              </Col>
                
              <Col sm="1.5">
              <Button
                  block
                  className="btn-round"
                  color="info"
                  size="sm"
                  type="submit"
                >
                  Add 
                </Button>
              </Col>
            </Row>
        
            <Card className="card-login card-plain">
              <MDBDataTable small style={{backgroundColor: 'rgba(228, 236, 232, 0.95)', marginBottom: "90px"}} data={this.state.data}>
              </MDBDataTable>
            </Card>
          </Form>
          </Container>
        </div>
      </div>
    </>
    )
  }
}
