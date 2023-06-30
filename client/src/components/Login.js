import React from 'react'
import './stars.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
//! saving for later use on 6.29.23 import LoginForm from './LoginForm'

class Login extends React.Component {
    render() {
        return (
    <div className="page-content page-container" id="page-content">
        <div className="padding ">
          <div className="row grid-margin">
            <div className="card ">
              <div className="card-body">
                <p className="card-description">Sign Into Airworthy</p>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Employee Name</th>
                        <th>Manager Name </th>
                        <th>Created On</th>
                        <th>Model Aircraft</th>
                        <th>Work Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Todd Anderson</td>
                        <td>Amy Jones</td>
                        <td>June 14th 2022</td>
                        <td>3375</td>
                        <td>Smoke Detector Mod</td>
                        <td>
                          <label className="badge badge-danger">Pending</label>
                        </td>
                      </tr>
                      <tr>
                        <td>Richard Slick</td>
                        <td>Jason Jack</td>
                        <td>15 May 2022</td>
                        <td>9375</td>
                        <td>Wifi Modification</td>
                        <td>
                          <label className="badge badge-success">Completed</label>
                        </td>
                      </tr>

                      <td>Peter mark</td>
                      <td>James Mathews</td>
                      <td>10 June 2022</td>
                      <td>2075</td>
                      <td>Radar Modification</td>

                      <td>
                        <label className="badge badge-warning">In progress</label>
                      </td>
                      <tr>
                        <td>Karen Becarin</td>
                        <td>Miles Colon</td>
                        <td>12 June 2022</td>
                        <td>5333</td>
                        <td>USB Modification</td>
                        <td>
                          <label className="badge badge-danger">Pending</label>
                        </td>
                        <td></td>
                      </tr>

                      <td>Andy Red</td>
                      <td>Emily Sanders</td>
                      <td>20 May 20222</td>
                      <td>5375</td>
                      <td>Fuel Tank Modification</td>
                      <td>
                        <label className="badge badge-success">Completed</label>
                      </td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

export default Login;