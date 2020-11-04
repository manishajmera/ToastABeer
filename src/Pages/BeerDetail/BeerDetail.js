import React, { useEffect } from "react";
import { connect } from "react-redux";
import { dispatchGetBeerDetails } from "../../Redux/Actions/Actions";
import { useParams } from "react-router-dom";
import "./BeerDetail.css";
import { ComplementFood } from "../../Components";

function BeerDetail({ beerData, dispatchGetBeerDetails }) {
  let { id } = useParams();
  useEffect(() => {
    dispatchGetBeerDetails(id);
  }, [dispatchGetBeerDetails,id]);
  console.log(beerData);
  return beerData ? (
    <div className="container">
      <div className="col col-sm-12 align margin-bottom">
        <img
          src={beerData.image_url ? beerData.image_url : "/default_beer.jpg"}
          alt="beer_image"
          height="360px"
          width="160px"
        />
        <h1>{beerData.name}</h1>
        <label className="text-secondary">{beerData.tagline}</label>
        <p className="text-secondary">
          Since:{beerData.first_brewed} || contributedBy:
          {beerData.contributed_by}
        </p>
      </div>
      <div className="col col-sm-12">
        <p>{beerData.description}</p>
      </div>
      <div className="col col-sm-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Properties</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>ABV</td>
              <td>{beerData.abv}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>IBU</td>
              <td>{beerData.ibu}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Target FG</td>
              <td>{beerData.target_fg}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Target OG</td>
              <td>{beerData.target_og}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>EBC</td>
              <td>{beerData.ebc}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>SRM</td>
              <td>{beerData.srm}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>PH</td>
              <td>{beerData.ph}</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Attenuation Level</td>
              <td>{beerData.attenuation_level}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ComplementFood complementFood={beerData.food_pairing} />
    </div>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    beerData: state.beerData,
  };
};

const mapDispatchToProps = {
  dispatchGetBeerDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(BeerDetail);
